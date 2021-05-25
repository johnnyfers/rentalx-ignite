import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('create category', () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it('it should be able to create a new category', async () => {
        const category = {
            name: 'category test',
            description: 'category test description'
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
   
        console.log(categoryCreated)

        expect(categoryCreated).toHaveProperty("id")
   
    })
})