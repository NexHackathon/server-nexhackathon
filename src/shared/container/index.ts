import { container } from 'tsyringe';

import '@modules/users/providers';

import { TeamsRepository } from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);
