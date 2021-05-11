import { SpecificationRepository } from "../repositories/SpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationRepository: SpecificationRepository) { };

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

export { CreateSpecificationService }