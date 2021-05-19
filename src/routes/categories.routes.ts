import { Router } from 'express';
import { listCategoriesController } from '../modules/cars/useCases/listCategories/index'
import multer from 'multer';
import { importCategoryController } from '../modules/cars/useCases/ImportCategory';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController'

const upload = multer({
    dest: './tmp'
})

const createCategoryController = new CreateCategoryController()

const categoriesRoutes = Router()


categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', (req, res) => { return listCategoriesController.handle(req, res)});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => { 
    return importCategoryController.handle(req,res);
})

export { categoriesRoutes }