import { inject, injectable } from 'tsyringe';

import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';

interface IResponse {
  id: string;
  name: string;
  description: string;
  members: number;
  users: {
    id: string;
    name: string;
    profile_image: string;
  }[];
}

@injectable()
export class ListTeamsUseCase {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
  ) {}

  async execute(): Promise<IResponse[]> {
    const teams = await this.teamsRepository.list();

    const teamsResponse: IResponse[] = teams.map(teams => {
      const users = teams.users.map(users => {
        return {
          id: users.id,
          name: users.name,
          profile_image: users.profile_image,
        };
      });

      return {
        id: teams.id,
        name: teams.name,
        members: users.length,
        description: teams.description,
        users,
      };
    });

    return teamsResponse;
  }
}
