import { isAfter, addHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { ITeamUsersTokenRepository } from '@modules/teams/repositories/ITeamUsersTokenRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  token: string;
}

@injectable()
export class JoinTeamUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('TeamUsersTokenRepository')
    private teamUsersTokenRepository: ITeamUsersTokenRepository,
  ) {}

  async execute({ user_id, token }: IRequest): Promise<void> {
    const teamUserToken = await this.teamUsersTokenRepository.findByToken(
      token,
    );

    if (!teamUserToken) {
      throw new AppError('Token does not exist');
    }

    const user = await this.usersRepository.findById(user_id);

    if (user.team_id) {
      throw new AppError('You are already in a team!');
    }

    if (user.id !== teamUserToken.user_id) {
      throw new AppError('You can not use this token.');
    }

    const tokenCreatedAt = teamUserToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    const team = await this.teamsRepository.findById(teamUserToken.team_id);

    user.team_id = team;

    user.inserted_team_date = new Date();

    await this.usersRepository.save(user);
  }
}
