import { Router } from 'express';

import { teamsRoutes } from './teams.routes';
import { usersRoutes } from './users.routes';

export const router = Router();

router.use('/teams', teamsRoutes);
router.use('/users', usersRoutes);
