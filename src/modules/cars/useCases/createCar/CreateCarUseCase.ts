import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    brand: string;
    fine_amount: number;
    category_id: string;
}

@injectable()
class CreateCarUseCase {

    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ){}

    async execute({ name, description, daily_rate, category_id, brand, fine_amount, license_plate }: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate)
        
        if(carAlreadyExists){
            throw new AppError('car already exists')
        }

        const car = await this.carsRepository.create({ name, description, daily_rate, category_id, brand, fine_amount, license_plate})
    
        return car
    }
}

export { CreateCarUseCase }