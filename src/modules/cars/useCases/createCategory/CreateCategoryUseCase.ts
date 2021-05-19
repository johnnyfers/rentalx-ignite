import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: CategoriesRepository
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const existing = await this.categoriesRepository.findByName(name)

        if (existing) throw new Error('category already exists')

        this.categoriesRepository.create({ name, description });

    }
}

export { CreateCategoryUseCase }