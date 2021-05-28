import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import {Car} from '../entities/Car'

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name: data.name,
                description: data.description,
                brand: data.brand,
                category_id: data.category_id,
                license_plate: data.license_plate,
                fine_amount: data.fine_amount,
                daily_rate: data.daily_rate
            })

        await this.repository.save(car)

        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.repository.findOne({license_plate})
        return car
        
    }
}

export { CarsRepository }