import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { inject, injectable} from 'tsyringe'

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

    execute({ name, description }: IRequest): void {
        const exists = this.specificationRepository.findByName(name);

        if (exists) throw new Error('specification already exists');

        this.specificationRepository.create(
            {
                name,
                description
            }
        );
    }
}

export { CreateSpecificationUseCase }