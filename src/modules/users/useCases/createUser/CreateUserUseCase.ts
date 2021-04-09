import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

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
    invite_token,
  }: ICreateUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('E-mail address alrealdy in use.');
    }

    if (invite_token) {
      const userHasInvited = await this.usersRepository.findByToken(
        invite_token,
      );

      if (userHasInvited) {
        await this.usersRepository.givePoints(userHasInvited.id, 300);
      }
    }

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
