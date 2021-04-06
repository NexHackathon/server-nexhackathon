import { getRepository, Repository } from 'typeorm';

import { ICreateTeamUsersTokenDTO } from '@modules/teams/dtos/ICreateTeamUsersTokenDTO';
import { ITeamUsersToken } from '@modules/teams/repositories/ITeamUsersToken';

import { TeamUserToken } from '../entities/TeamUserToken';

export class TeamUsersTokenRepository implements ITeamUsersToken {
  private repository: Repository<TeamUserToken>;

  constructor() {
    this.repository = getRepository(TeamUserToken);
  }

  async findByToken(token: string): Promise<TeamUserToken> {
    const teamUsersToken = await this.repository.findOne({
      where: { token },
    });

    return teamUsersToken;
  }

  async generate({
    user_id,
    team_id,
  }: ICreateTeamUsersTokenDTO): Promise<TeamUserToken> {
    const teamUserToken = this.repository.create({
      user_id,
      team_id,
    });

    await this.repository.save(teamUserToken);

    return teamUserToken;
  }
}
