import { getRepository, Repository } from 'typeorm';

import { ICreateTeamDTO } from '@modules/teams/dtos/ICreateTeamDTO';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';

import { Team } from '../entities/Team';

export class TeamsRepository implements ITeamsRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = getRepository(Team);
  }

  async create({ name, description }: ICreateTeamDTO): Promise<Team> {
    const team = this.repository.create({
      name,
      description,
    });

    await this.repository.save(team);

    return team;
  }

  async list(): Promise<Team[]> {
    const teams = await this.repository.find();

    return teams;
  }
}
