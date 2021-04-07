import { Router } from 'express';

import { CreateTeamController } from '@modules/teams/useCases/createTeam/CreateTeamController';
import { JoinTeamController } from '@modules/teams/useCases/joinTeam/JoinTeamController';
import { LeaveTeamController } from '@modules/teams/useCases/leaveTeam/LeaveTeamController';
import { ListTeamsController } from '@modules/teams/useCases/listTeams/ListTeamsController';
import { RemoveTeamController } from '@modules/teams/useCases/removeTeam/RemoveTeamController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const teamsRoutes = Router();

const createTeamController = new CreateTeamController();
const joinTeamController = new JoinTeamController();
const leaveTeamController = new LeaveTeamController();
const listTeamsController = new ListTeamsController();
const removeTeamController = new RemoveTeamController();

teamsRoutes.post('/', ensureAuthenticated, createTeamController.handle);

teamsRoutes.post('/join', ensureAuthenticated, joinTeamController.handle);

teamsRoutes.patch('/leave', ensureAuthenticated, leaveTeamController.handle);

teamsRoutes.get('/', ensureAuthenticated, listTeamsController.handle);

teamsRoutes.delete('/', ensureAuthenticated, removeTeamController.handle);
