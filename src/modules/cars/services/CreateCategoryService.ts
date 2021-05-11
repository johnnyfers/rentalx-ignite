import { CategoriesRepository } from '../repositories/CategoriesRepository';
//const categoriesRepository = new CategoriesRepository()

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {

    constructor(private categoriesRepository: CategoriesRepository) { }

    execute({ name, description }: IRequest): void {
        const existing = this.categoriesRepository.findByName(name)

        if (existing) throw new Error('category already exists')

        this.categoriesRepository.create({ name, description });

    }
}

export { CreateCategoryService }