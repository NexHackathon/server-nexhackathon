import { Router } from 'express';

import { teamsRoutes } from './teams.routes';

export const router = Router();

router.use('/teams', teamsRoutes);
