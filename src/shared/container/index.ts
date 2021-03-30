import { container } from 'tsyringe';

import { TeamsRepository } from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';

container.registerSingleton<ITeamsRepository>(
  'TeamsRepository',
  TeamsRepository,
);
