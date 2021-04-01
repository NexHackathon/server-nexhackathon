import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

interface IResponse {
  id: string;
  name: string;
  position: number;
  level: string;
  points: number;
  profile_image: string;
}

@injectable()
export class RankUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<IResponse[]> {
    const users = await this.usersRepository.rankUsersByPoints();

    const usersResponse: IResponse[] = users.map((users, index) => {
      let level: string;

      if (users.points <= 1000) {
        level = 'Calouro';
      } else if (users.points <= 3000) {
        level = 'Veterano';
      } else {
        level = 'Mestre';
      }

      return {
        id: users.id,
        name: users.name,
        level,
        position: index + 1,
        points: Number(users.points),
        profile_image: users.profile_image,
      };
    });

    return usersResponse;
  }
}
