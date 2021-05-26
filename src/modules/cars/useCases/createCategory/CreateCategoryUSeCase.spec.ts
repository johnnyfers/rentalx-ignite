import { AppError } from "../../../../errors/AppError";
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

    it('it should not to be able to create a new category with an existing name', async () => {
        
        expect(async()=>{
            const category = {
                name: 'category test',
                description: 'category test description'
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
        }).rejects.toBeInstanceOf(AppError)   
    })
})