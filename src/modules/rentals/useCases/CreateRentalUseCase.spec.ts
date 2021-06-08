import { AppError } from "../../../shared/errors/AppError"
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"


let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory

describe('Create rental', () => {

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory)
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '12345',
            car_id: '54321',
            expected_return_date: new Date()
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not to be able to create a new rental if there is another open to the same user', async () => {
        expect(async ()=> {

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '2131312',
                expected_return_date: new Date()
            })
    
            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
    
    it('should not to be able to create a new rental if there is another open to the same car', async () => {
        expect(async ()=> {

            await createRentalUseCase.execute({
                user_id: '12345',
                car_id: '54321',
                expected_return_date: new Date()
            })
    
            await createRentalUseCase.execute({
                user_id: '12312312312',
                car_id: '54321',
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})