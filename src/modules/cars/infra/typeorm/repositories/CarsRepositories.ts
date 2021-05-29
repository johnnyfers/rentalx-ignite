import { getRepository, Repository } from "typeorm";
import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import {Car} from '../entities/Car'

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({ name, description, daily_rate, category_id, brand, fine_amount, license_plate }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({ name, description, category_id, brand, license_plate, daily_rate, fine_amount})
    
        await this.repository.save(car)

        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.repository.findOne({license_plate})
        
        return car
    }
}

export { CarsRepository }