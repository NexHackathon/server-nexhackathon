import { inject, injectable } from 'tsyringe';

import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export class UpdateUserProfileImageUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (user.profile_image === null) {
      user.points = Number(user.points) + Number(200);
    }

    if (user.profile_image) {
      await this.storageProvider.deleteFile(user.profile_image);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.profile_image = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}
