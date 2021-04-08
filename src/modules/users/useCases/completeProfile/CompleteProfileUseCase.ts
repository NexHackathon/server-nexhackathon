import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  headline?: string;
  description?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

@injectable()
export class CompleteProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    description,
    headline,
    user_id,
    github,
    instagram,
    linkedin,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (headline) {
      user.headline = headline;
    }

    if (description) {
      user.description = description;
    }

    if (github) {
      user.github = github;
    }

    if (instagram) {
      user.instagram = instagram;
    }

    if (linkedin) {
      user.linkedin = linkedin;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
