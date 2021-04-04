import { getManager, getRepository, Repository } from 'typeorm';

import { ICreateTeamDTO } from '@modules/teams/dtos/ICreateTeamDTO';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { Team } from '../entities/Team';

export class TeamsRepository implements ITeamsRepository {
  private repository: Repository<Team>;

  constructor() {
    this.repository = getRepository(Team);
  }

  create({ name, description }: ICreateTeamDTO): Team {
    const team = this.repository.create({
      name,
      description,
    });

    return team;
  }

  async findById(id: string): Promise<Team> {
    const team = await this.repository.findOne({
      where: { id },
      relations: ['users'],
    });

    return team;
  }

  async list(): Promise<Team[]> {
    const teams = await this.repository.find({ relations: ['users'] });

    return teams;
  }

  async saveTrx(team: Team, user: User): Promise<void> {
    await getManager().transaction(async entityManager => {
      await entityManager.save(team);
      await entityManager.save(user);
    });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
