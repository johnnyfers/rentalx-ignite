import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoriesInMemory } from "../../repositories/in-memory/CarsRepositoresInMemory"
import { SpecificationInMemory } from "../../repositories/in-memory/SpecificationInMemory"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoriesInMemory
let specificationsRepositoryInMemory: SpecificationInMemory

describe('create a car specification', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoriesInMemory()
        specificationsRepositoryInMemory = new SpecificationInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
    })

    it('should not to be able to add a new specification to the non existing car', async () => {
        expect(async () => {
            const car_id = '1234'
            const specifications_id = ['1234']
            await createCarSpecificationUseCase.execute({ car_id, specifications_id })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'name car',
            description: 'desc',
            daily_rate: 100,
            category_id: '123',
            brand: 'brand',
            fine_amount: 100,
            license_plate: '111ccc'
        })

        const specification = await  specificationsRepositoryInMemory.create({
            description: 'test',
            name: 'test'
        })

        const specifications_id = [specification.id]
        
        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })
    
        expect(specificationsCars).toHaveProperty('specifications')
        expect(specificationsCars.specifications.length).toBe(1)
    })
})