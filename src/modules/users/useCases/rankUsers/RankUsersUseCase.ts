import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { comparePoints } from '@shared/utils/ComparePoints';

interface IRequest {
  user_id: string;
}

interface IUser {
  id: string;
  name: string;
  position: number;
  level: string;
  points: number;
  profile_image: string;
}

interface IResponse {
  user: IUser;
  ranking: IUser[];
}

@injectable()
export class RankUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse | IUser[]> {
    const userAdmin = await this.usersRepository.findById(user_id);

    const users = await this.usersRepository.rankUsersByPoints();

    const ranking = users.map((users, index) => {
      const level = comparePoints(users.points);

      return {
        id: users.id,
        name: users.name,
        level,
        position: index + 1,
        points: Number(users.points),
        profile_image: users.profile_image,
      };
    });

    if (userAdmin.isAdmin) {
      return ranking;
    }

    const { name, points, profile_image } = users.find(
      user => user.id === user_id,
    );

    const position = users.findIndex(user => user.id === user_id);

    const user = {
      name,
      position: position + 1,
      points,
      profile_image,
    };

    const usersResponse = {
      user,
      ranking,
    } as IResponse;

    return usersResponse;
  }
}
