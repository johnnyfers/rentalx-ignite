import { Router } from 'express';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passswordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()

passswordRoutes.post('/forgot', sendForgotPasswordMailController.handle)

export { passswordRoutes }