import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

@injectable()
export class RegisteredUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<number> {
    const usersCount = await this.usersRepository.getUsersCount();

    return usersCount;
  }
}
