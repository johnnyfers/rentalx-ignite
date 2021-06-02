import {Router} from 'express' 
import CreateCarController from '../../../../modules/cars/useCases/createCar/CreateCarUseCaseController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

let createCarController = new CreateCarController()
let availableCarsController = new ListAvailableCarsController()
let createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', availableCarsController.handle)
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

export {carsRoutes}