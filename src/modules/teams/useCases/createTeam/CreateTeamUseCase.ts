import { inject, injectable } from 'tsyringe';

import { ICreateTeamDTO } from '@modules/teams/dtos/ICreateTeamDTO';
import { Team } from '@modules/teams/infra/typeorm/entities/Team';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, description, user_id }: ICreateTeamDTO): Promise<Team> {
    const user = await this.usersRepository.findById(user_id);

    if (user.team_id) {
      throw new AppError('You are already in a team!');
    }

    const team = this.teamsRepository.create({
      name,
      description,
    });

    user.team_id = team.id;

    await this.teamsRepository.saveTrx(team, user);

    return team;
  }
}
