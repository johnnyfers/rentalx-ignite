import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer'
import uploadConfig from '../../../../config/Upload'
import { ProfileUserController } from '../../../../modules/accounts/useCases/ProfileUser/ProfileUserController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserAvatarController()
const profileUserController = new ProfileUserController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.patch('/avatar', ensureAuthenticated , uploadAvatar.single('avatar'), updateUserController.handle )
usersRoutes.get('/profile', ensureAuthenticated, profileUserController.handle)

export { usersRoutes }