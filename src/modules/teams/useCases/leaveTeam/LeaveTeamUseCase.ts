import { inject, injectable } from 'tsyringe';

import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
export class LeaveTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    const team = await this.teamsRepository.findById(user.team_id.id);

    if (!user.team_id.id) {
      throw new AppError('You are not on a team!');
    }

    user.team_id = null;

    await this.usersRepository.save(user);

    if (team.users.length < 1) {
      await this.teamsRepository.remove(team.id);
    }
  }
}
