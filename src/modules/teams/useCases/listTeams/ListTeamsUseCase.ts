import { inject, injectable } from 'tsyringe';

import { Team } from '@modules/teams/infra/typeorm/entities/Team';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';

@injectable()
export class ListTeamsUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute(): Promise<Team[]> {
    const teams = await this.teamsRepository.list();

    return teams;
  }
}
