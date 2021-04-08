import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  school: string;
  date_of_birth: string;
  headline?: string;
  old_password?: string;
  password?: string;
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    email,
    school,
    date_of_birth,
    headline,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use.');
    }

    user.name = name;
    user.email = email;
    user.school = school;
    user.date_of_birth = date_of_birth;

    if (headline) {
      user.headline = headline;
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
