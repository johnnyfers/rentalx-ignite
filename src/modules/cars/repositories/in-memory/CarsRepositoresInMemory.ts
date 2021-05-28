import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoriesInMemory implements ICarsRepository {
    cars: Car[] = []
    
    async create({name, description, daily_rate, category_id, brand, fine_amount, license_plate}: ICreateCarDTO): Promise<Car> {
        const car = new Car()

        Object.assign(car, {
            name, description, daily_rate, category_id, brand, fine_amount, license_plate
        })

        this.cars.push(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car)=> car.license_plate === license_plate)
    }

}

export { CarsRepositoriesInMemory}