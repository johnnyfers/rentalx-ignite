import { container } from 'tsyringe';
import { ICreateCategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository';
import { ICreateSpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';

container.registerSingleton<ICreateCategoryRepository>(
    'CategoriesRepository',
    CategoriesRepository
)

container.registerSingleton<ICreateSpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)