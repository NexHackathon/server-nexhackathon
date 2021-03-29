import { ICreateTeamDTO } from '../dtos/ICreateTeamDTO';
import { Team } from '../infra/typeorm/entities/Team';

export interface ITeamsRepository {
  create(data: ICreateTeamDTO): Promise<Team>;
}
