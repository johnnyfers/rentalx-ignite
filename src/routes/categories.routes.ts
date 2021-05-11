import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { categoryController} from '../modules/cars/useCases/createCategory/index';

const categoriesRoutes = Router()

const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (req,res)=>{ return categoryController.handle(req,res)});

categoriesRoutes.get('/', (req, res) => {
    const all = categoriesRepository.list();

    return res.status(200).json(all)
});

export { categoriesRoutes }