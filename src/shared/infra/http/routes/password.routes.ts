import { Router } from 'express';
import { ResetPasswordUserController } from '../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passswordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passswordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passswordRoutes.post('/reset', resetPasswordUserController.handle)

export { passswordRoutes }