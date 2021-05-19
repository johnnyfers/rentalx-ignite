import { Router } from 'express';
import { ListCategoriesController } from '../modules/cars/useCases/listCategories/ListCategoriesController'
import multer from 'multer';
import { ImportCategoryController } from '../modules/cars/useCases/ImportCategory/ImportCategoryController';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController'

const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

const categoriesRoutes = Router()


categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), importCategoryController.handle)

export { categoriesRoutes }