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
}
