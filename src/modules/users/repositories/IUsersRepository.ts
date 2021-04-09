import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findOldestUser(team_id: string): Promise<User>;
  findUsersOnTeam(team_id: string): Promise<User[]>;
  getUsersCount(): Promise<number>;
  givePoints(user_id: string, points: number): Promise<User>;
  rankUsersByPoints(): Promise<User[]>;
  save(user: User): Promise<User>;
}
