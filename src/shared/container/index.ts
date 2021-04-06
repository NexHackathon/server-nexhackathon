import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import { SkillsRepository } from '@modules/skills/infra/typeorm/repositories/SkillsRepository';
import { ISkillsRepository } from '@modules/skills/repositories/ISkillsRepository';
import { TeamsRepository } from '@modules/teams/infra/typeorm/repositories/TeamsRepository';
import { TeamUsersTokenRepository } from '@modules/teams/infra/typeorm/repositories/TeamUsersTokenRepository';
import { ITeamsRepository } from '@modules/teams/repositories/ITeamsRepository';
import { ITeamUsersTokenRepository } from '@modules/teams/repositories/ITeamUsersTokenRepository';
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

container.registerSingleton<ISkillsRepository>(
  'SkillsRepository',
  SkillsRepository,
);

container.registerSingleton<ITeamUsersTokenRepository>(
  'TeamUsersTokenRepository',
  TeamUsersTokenRepository,
);
