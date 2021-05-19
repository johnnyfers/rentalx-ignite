import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";


class ListCategoriesUseCase{
    constructor(private categoriesRepository: CategoriesRepository) { }

    execute():  Promise<void> {
        const categories = this.categoriesRepository.list();

        return categories
    }

}

export { ListCategoriesUseCase}