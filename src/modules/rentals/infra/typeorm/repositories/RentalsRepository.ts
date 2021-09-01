import { getRepository, Repository } from "typeorm";
import { ICreateRentalDTO } from "../../../dtos/ICreateRentalDTO";
import { IRentalsRepository } from "../../../repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";


class RentalsRepository implements IRentalsRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }
    
    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id)

        return rental
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: { car_id, end_date: null}
        })

        return openByCar
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
            where: { user_id, end_date: null}
        })
  
        return openByUser
    }
    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id: data.car_id,
            user_id: data.user_id,
            expected_return_date: data.expected_return_date,
            id: data.id,
            end_date: data.end_date,
            total: data.total
        })

        await this.repository.save(rental)

        return rental
    }

}

export { RentalsRepository }