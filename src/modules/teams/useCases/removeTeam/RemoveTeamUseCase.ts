import { inject, injectable } from 'tsyringe';

import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
export class RemoveTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user.team_id) {
      throw new AppError('You are not on a team!');
    }

    const oldestUser = await this.usersRepository.findOldestUser(
      user.team_id.id,
    );

    if (oldestUser.id !== user.id) {
      throw new AppError('Only oldest user on the team can delete it!');
    }

    const usersOnTeam = await this.usersRepository.findUsersOnTeam(
      user.team_id.id,
    );

    await this.teamsRepository.remove(user.team_id.id);

    usersOnTeam.map(async user => {
      user.inserted_team_date = null;
      user.team_id = null;

      return this.usersRepository.save(user);
    });
  }
}
