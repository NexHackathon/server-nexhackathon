import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { RegisteredUsersController } from '@modules/users/useCases/registeredUsers/RegisteredUsersController';
import { UpdateUserProfileImageController } from '@modules/users/useCases/updateUserProfileImage/UpdateUserProfileImageController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

const registeredUsersController = new RegisteredUsersController();

const updateUserProfileImageController = new UpdateUserProfileImageController();

const upload = multer(uploadConfig.multer);

usersRoutes.post('/', createUserController.handle);

usersRoutes.get(
  '/connections',
  ensureAuthenticated,
  registeredUsersController.handle,
);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('profileImage'),
  updateUserProfileImageController.handle,
);
