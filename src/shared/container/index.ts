import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import { TeamsRepository } from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
