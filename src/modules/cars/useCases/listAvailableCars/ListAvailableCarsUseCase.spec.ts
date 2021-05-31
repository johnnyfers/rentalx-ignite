import { CarsRepositoriesInMemory } from "../../repositories/in-memory/CarsRepositoresInMemory"
import { ListCarsUseCase } from "./ListAvailableCarsUseCase"

let listCarsUseCase: ListCarsUseCase
let carsRepositoryInMemory: CarsRepositoriesInMemory

describe('list cars', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoriesInMemory()
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
    })

    it('should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'name car',
            description: 'desc',
            daily_rate: 100,
            category_id: '123',
            brand: 'brand',
            fine_amount: 100,
            license_plate: '111ccc'
        })

        const cars = await listCarsUseCase.execute({name: 'name car'})

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by name', async()=>{
        const car = await carsRepositoryInMemory.create({
            name: 'name car1',
            description: 'desc1',
            daily_rate: 1001,
            category_id: '1231',
            brand: 'brand1',
            fine_amount: 1001,
            license_plate: '111ccc1'
        })

        const cars = await listCarsUseCase.execute({name: 'name car1'})

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by category', async()=>{
        const car = await carsRepositoryInMemory.create({
            name: 'name car11',
            description: 'desc11',
            daily_rate: 10011,
            category_id: '12311',
            brand: 'brand11',
            fine_amount: 10011,
            license_plate: '111ccc11'
        })

        const cars = await listCarsUseCase.execute({category_id: '12311'})

        expect(cars).toEqual([car])
    })

})