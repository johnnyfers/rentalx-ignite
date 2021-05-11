import { Router } from 'express';
import { categoryController } from '../modules/cars/useCases/createCategory/index';
import { listCategoriesController } from '../modules/cars/useCases/listCategories/index'

const categoriesRoutes = Router()


categoriesRoutes.post('/', (req, res) => { return categoryController.handle(req, res) });

categoriesRoutes.get('/', (req, res) => { return listCategoriesController.handle(req, res)});

export { categoriesRoutes }