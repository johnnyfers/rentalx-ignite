import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCategoryRepository } from '../../repositories/ICategoryRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICreateCategoryRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const existing = await this.categoriesRepository.findByName(name)

        if (existing) throw new AppError('category already exists')

        this.categoriesRepository.create({ name, description });

    }
}

export { CreateCategoryUseCase }