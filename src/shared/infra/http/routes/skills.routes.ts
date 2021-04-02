import { Router } from 'express';

import { CreateSkillController } from '@modules/skills/useCases/createSkill/CreateSkillController';
import { ListSkillsController } from '@modules/skills/useCases/listSkills/ListSkillsController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const skillsRoutes = Router();

const createSkillController = new CreateSkillController();
const listSkillsController = new ListSkillsController();

skillsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSkillController.handle,
);

skillsRoutes.get('/', ensureAuthenticated, listSkillsController.handle);
