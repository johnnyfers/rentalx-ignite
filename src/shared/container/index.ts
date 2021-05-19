import { container } from 'tsyringe';
import { ICreateCategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

container.registerSingleton<ICreateCategoryRepository>(
    'CategoriesRepository',
    CategoriesRepository
)

