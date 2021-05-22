import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: SpecificationRepository
    ) { };

    async execute({ name, description }: IRequest): Promise<void> {
        const exists = await this.specificationRepository.findByName(name);

        if (exists) throw new AppError('specification already exists');

        await this.specificationRepository.create(
            {
                name,
                description
            }
        );
    }
}

export { CreateSpecificationUseCase }