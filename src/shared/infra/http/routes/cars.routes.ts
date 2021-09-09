import {Router} from 'express' 
import multer from 'multer'
import CreateCarController from '../../../../modules/cars/useCases/createCar/CreateCarUseCaseController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageContrller'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import uploadConfig from '../../../../config/Upload'

const carsRoutes = Router()

const uploadImage = multer(uploadConfig)

const createCarController = new CreateCarController()
const availableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', availableCarsController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, uploadImage.array('images'), uploadCarImageController.handle)

export {carsRoutes}