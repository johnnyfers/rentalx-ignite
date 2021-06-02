import { AppError } from "../../../../shared/errors/AppError"
import { ICarsRepository } from "../../repositories/ICarsRepository"
import { ICreateSpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
    car_id: string;
    specifications_id: string[];

}

class CreateCarSpecificationUseCase{

    constructor(
        private carsRepository: ICarsRepository,

        private specificationsRepository: ICreateSpecificationRepository
    ){}

    async execute({car_id, specifications_id}: IRequest): Promise<void>{

        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError('car does not exists')
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id)

        carExists.specifications = specifications

        await this.carsRepository.create(carExists)
    }
}

export { CreateCarSpecificationUseCase }