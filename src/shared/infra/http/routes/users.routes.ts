import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CompleteProfileController } from '@modules/users/useCases/completeProfile/CompleteProfileController';
import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { CreateUserSkillController } from '@modules/users/useCases/createUserSkill/CreateUserSkillController';
import { FindUserController } from '@modules/users/useCases/findUser/FindUserController';
import { RankUsersController } from '@modules/users/useCases/rankUsers/RankUsersController';
import { RegisteredUsersController } from '@modules/users/useCases/registeredUsers/RegisteredUsersController';
import { ShowProfileController } from '@modules/users/useCases/showProfile/ShowProfileController';
import { UpdateProfileController } from '@modules/users/useCases/updateProfile/UpdateProfileController';
import { UpdateUserProfileImageController } from '@modules/users/useCases/updateUserProfileImage/UpdateUserProfileImageController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const completeProfileController = new CompleteProfileController();
const createUserController = new CreateUserController();
const createUserSkillController = new CreateUserSkillController();
const findUserController = new FindUserController();
const registeredUsersController = new RegisteredUsersController();
const updateUserProfileImageController = new UpdateUserProfileImageController();
const rankUsersController = new RankUsersController();
const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

const upload = multer(uploadConfig.multer);

usersRoutes.post('/', createUserController.handle);

usersRoutes.put(
  '/complete-profile',
  ensureAuthenticated,
  completeProfileController.handle,
);

usersRoutes.get('/connections', registeredUsersController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('profileImage'),
  updateUserProfileImageController.handle,
);

usersRoutes.get('/rank', ensureAuthenticated, rankUsersController.handle);

usersRoutes.get('/profile', ensureAuthenticated, showProfileController.handle);

usersRoutes.get('/:id', ensureAuthenticated, findUserController.handle);

usersRoutes.post(
  '/skills',
  ensureAuthenticated,
  createUserSkillController.handle,
);

usersRoutes.put(
  '/update-profile',
  ensureAuthenticated,
  updateProfileController.handle,
);
