import {Router} from 'express' 
import CreateCarController from '../../../../modules/cars/useCases/createCar/CreateCarUseCaseController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

let createCarController = new CreateCarController()
let availableCarsController = new ListAvailableCarsController()

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get('/available', availableCarsController.handle)

export {carsRoutes}