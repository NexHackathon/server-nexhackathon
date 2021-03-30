import { Router } from 'express';

import { CreateTeamController } from '@modules/teams/useCases/createTeam/CreateTeamController';

export const teamsRoutes = Router();

const createTeamController = new CreateTeamController();

teamsRoutes.post('/', createTeamController.handle);
