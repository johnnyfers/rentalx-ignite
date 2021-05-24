import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer'
import uploadConfig from '../config/Upload'

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch('/avatar', ensureAuthenticated , uploadAvatar.single('avatar'), updateUserController.handle )

export { usersRoutes }