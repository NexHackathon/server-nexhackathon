import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    name,
    school,
    date_of_birth,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      school,
      date_of_birth,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
