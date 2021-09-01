import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoriesInMemory implements ICarsRepository {
    cars: Car[] = []

    async create({ name, description, daily_rate, category_id, brand, fine_amount, license_plate, id }: ICreateCarDTO): Promise<Car> {
        const car = new Car()

        Object.assign(car, {
            name, description, daily_rate, category_id, brand, fine_amount, license_plate, id
        })

        this.cars.push(car)

        return car
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate)
    }

    async findAvailable(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
        const cars = this.cars.filter((car) => car.available === true ||
            (brand && car.brand === brand) ||
            (category_id && car.category_id === category_id) ||
            (name && car.name === name)
        )

        return cars
    }

    async findById(id: string): Promise<Car>{
        const car = this.cars.find(car => car.id === id)

        return car
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id === id)

        this.cars[findIndex].available = available
    }
}

export { CarsRepositoriesInMemory }