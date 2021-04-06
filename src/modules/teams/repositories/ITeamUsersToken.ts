import { ICreateTeamUsersTokenDTO } from '../dtos/ICreateTeamUsersTokenDTO';
import { TeamUserToken } from '../infra/typeorm/entities/TeamUserToken';

export interface ITeamUsersToken {
  findByToken(token: string): Promise<TeamUserToken>;
  generate(data: ICreateTeamUsersTokenDTO): Promise<TeamUserToken>;
}
