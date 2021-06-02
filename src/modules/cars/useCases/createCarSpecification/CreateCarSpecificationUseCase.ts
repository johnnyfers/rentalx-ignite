import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { Car } from "../../infra/typeorm/entities/Car"
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ICreateSpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
    car_id: string;
    specifications_id: string[];

}

@injectable()
class CreateCarSpecificationUseCase{

    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('SpecificationRepository')
        private specificationsRepository: ICreateSpecificationRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<Car>{
        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError('car does not exists')
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id)

        carExists.specifications = specifications

        await this.carsRepository.create(carExists)

        return carExists
    }
}

export { CreateCarSpecificationUseCase }