import { AppError } from '../../../../shared/errors/AppError'
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
        const car = await createCarUseCase.execute({
            name: 'name car',
            description: 'desc',
            daily_rate: 100,
            category_id: '123',
            brand: 'brand',
            fine_amount: 100,
            license_plate: '111ccc'
        })

        expect(car).toHaveProperty('id')
    })

    it('should not to be able to create a car with existing license plate', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'name car',
                description: 'desc',
                daily_rate: 100,
                category_id: '123',
                brand: 'brand',
                fine_amount: 100,
                license_plate: '111ccc'
            })

            await createCarUseCase.execute({
                name: 'name car 2',
                description: 'desc',
                daily_rate: 100,
                category_id: '123',
                brand: 'brand',
                fine_amount: 100,
                license_plate: '111ccc'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not to be able to create a available default car', async () => {
        const car = await createCarUseCase.execute({
            name: 'available car',
            description: 'desc',
            daily_rate: 100,
            category_id: '123',
            brand: 'brand',
            fine_amount: 100,
            license_plate: '111ccc'
        })
        
        expect(car.available).toBe(true)
    })
})