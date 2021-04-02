import { Router } from 'express';

import { CreateSkillController } from '@modules/skills/useCases/createSkill/CreateSkillController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const skillsRoutes = Router();

const createSkillController = new CreateSkillController();

skillsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSkillController.handle,
);
