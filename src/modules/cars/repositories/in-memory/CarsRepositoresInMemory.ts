import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoriesInMemory implements ICarsRepository {
    cars: Car[] = []
    
    async create({name, description, daily_rate, category_id, brand, fine_amount, license_plate}: ICreateCarDTO): Promise<void> {
        const car = new Car()

        Object.assign(car, {
            name, description, daily_rate, category_id, brand, fine_amount, license_plate
        })

        this.cars.push(car)
    }

}

export { CarsRepositoriesInMemory}