import { inject, injectable } from 'tsyringe';

import { ICreateTeamDTO } from '@modules/teams/dtos/ICreateTeamDTO';
import { Team } from '@modules/teams/infra/typeorm/entities/Team';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';

@injectable()
export class CreateTeamUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute({ name, description }: ICreateTeamDTO): Promise<Team> {
    const team = this.teamsRepository.create({
      name,
      description,
    });

    return team;
  }
}
