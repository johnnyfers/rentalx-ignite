import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUserRepository } from '../../modules/accounts/repositories/IUserRepository';

import { ICreateCategoryRepository } from '../../modules/cars/repositories/ICategoryRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository';

import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { ICreateSpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepositories';
import { ICarsImageRepository } from '../../modules/cars/repositories/ICarsImageRepository';
import { CarsImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository';

container.registerSingleton<ICreateCategoryRepository>(
    'CategoriesRepository',
    CategoriesRepository
)

container.registerSingleton<ICreateSpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
)

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
)

container.registerSingleton<ICarsRepository>(
    'CarsRepository',
    CarsRepository
)


container.registerSingleton<ICarsImageRepository>(
    'CarsImageRepository',
    CarsImageRepository
)