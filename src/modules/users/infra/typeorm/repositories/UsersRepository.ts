import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    school,
    date_of_birth,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      school,
      date_of_birth,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { id },
      relations: ['team_id', 'skills'],
    });

    return user;
  }

  async findOldestUser(team_id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { team_id },
      order: { inserted_team_date: 'ASC' },
    });

    return user;
  }

  async findUsersOnTeam(team_id: string): Promise<User[]> {
    const users = await this.repository.find({
      where: { team_id },
      order: { inserted_team_date: 'ASC' },
    });

    return users;
  }

  async getUsersCount(): Promise<number> {
    const [, usersCount] = await this.repository.findAndCount();

    return usersCount;
  }

  async rankUsersByPoints(): Promise<User[]> {
    const users = await this.repository.find({
      where: { isAdmin: false },
      order: { points: 'DESC' },
    });

    return users;
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
