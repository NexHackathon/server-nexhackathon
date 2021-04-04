import { Router } from 'express';

import { CreateTeamController } from '@modules/teams/useCases/createTeam/CreateTeamController';
import { ListTeamsController } from '@modules/teams/useCases/listTeams/ListTeamsController';
import { RemoveTeamController } from '@modules/teams/useCases/removeTeam/RemoveTeamController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const teamsRoutes = Router();

const createTeamController = new CreateTeamController();
const listTeamsController = new ListTeamsController();
const removeTeamController = new RemoveTeamController();

teamsRoutes.post('/', ensureAuthenticated, createTeamController.handle);

teamsRoutes.get('/', ensureAuthenticated, listTeamsController.handle);

teamsRoutes.delete('/', ensureAuthenticated, removeTeamController.handle);
