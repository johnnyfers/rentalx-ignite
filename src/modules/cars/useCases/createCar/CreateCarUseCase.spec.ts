import { CarsRepositoriesInMemory } from '../../repositories/in-memory/CarsRepositoresInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepository: CarsRepositoriesInMemory

describe('Create car', () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoriesInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepository)
    })

    it('should be able to create a new car', async () => {
        await createCarUseCase.execute({
            name: 'name car',
            description: 'desc',
            daily_rate: 100,
            category_id: '123',
            brand: 'brand',
            fine_amount: 100,
            license_plate: '111ccc'
        })
    })
})