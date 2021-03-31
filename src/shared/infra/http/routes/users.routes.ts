import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { RegisteredUsersController } from '@modules/users/useCases/registeredUsers/RegisteredUsersController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

const registeredUsersController = new RegisteredUsersController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get(
  '/connections',
  ensureAuthenticated,
  registeredUsersController.handle,
);
