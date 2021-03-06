import { User } from '@modules/users/infra/typeorm/entities/User';

import { ICreateTeamDTO } from '../dtos/ICreateTeamDTO';
import { Team } from '../infra/typeorm/entities/Team';

export interface ITeamsRepository {
  create(data: ICreateTeamDTO): Team;
  findById(id: string): Promise<Team>;
  list(): Promise<Team[]>;
  saveTrx(team: Team, user: User): Promise<void>;
  remove(id: string): Promise<void>;
}
