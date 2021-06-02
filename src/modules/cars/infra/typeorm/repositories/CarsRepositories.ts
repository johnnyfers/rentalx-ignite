import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from '../entities/Car'

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({ name, description, daily_rate, category_id, brand, fine_amount, license_plate, specification }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({ name, description, category_id, brand, license_plate, daily_rate, fine_amount })

        await this.repository.save(car)

        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.repository.findOne({ license_plate })

        return car
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id)
    }

    async findAvailable(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
        const carsQuery = this.repository.
            createQueryBuilder('car')
            .where('available = :available', { available: true })

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id })
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name })
        }

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand })
        }


        const cars = await carsQuery.getMany()

        return cars
    }
}

export { CarsRepository }