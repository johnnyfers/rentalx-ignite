import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implemantaions/DayjsDateProvider"
import { AppError } from "../../../../shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from 'dayjs'
import { CarsRepositoriesInMemory } from "../../../cars/repositories/in-memory/CarsRepositoresInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoriesInMemory

describe('Create rental', () => {
    const dayAdd24hours = dayjs().add(1, 'day').toDate()

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        dayjsProvider = new DayjsDateProvider()
        carsRepositoryInMemory = new CarsRepositoriesInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsProvider,  carsRepositoryInMemory)
    })

    it('should be able to create a new rental', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'ddddddd',
            description: 'sdsdsadsad',
            daily_rate:  100,
            license_plate: 'sdsadas',
            category_id: 'dsasdas',
            brand: 'sdsssss',
            fine_amount: 40
        })
        
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: car.id,
            expected_return_date: dayAdd24hours
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not to be able to create a new rental if there is another open to the same user', async () => {
        expect(async () => {

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '2131312',
                expected_return_date: dayAdd24hours
            })

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not to be able to create a new rental if there is another open to the same car', async () => {
        expect(async () => {

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: dayAdd24hours
            })

            await createRentalUseCase.execute({
                user_id: '12312312312',
                car_id: '54321',
                expected_return_date: dayAdd24hours
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not to be able to create a new rental with an invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})