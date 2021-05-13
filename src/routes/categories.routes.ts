import { Router } from 'express';
import { categoryController } from '../modules/cars/useCases/createCategory/index';
import { listCategoriesController } from '../modules/cars/useCases/listCategories/index'
import multer from 'multer';
import { importCategoryController } from '../modules/cars/useCases/ImportCategory';

const upload = multer({
    dest: './tmp'
})

const categoriesRoutes = Router()


categoriesRoutes.post('/', (req, res) => { return categoryController.handle(req, res) });

categoriesRoutes.get('/', (req, res) => { return listCategoriesController.handle(req, res)});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => { 
    return importCategoryController.handle(req,res);
})

export { categoriesRoutes }