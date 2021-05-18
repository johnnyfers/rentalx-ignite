import { Specification } from "../entities/Specification";


interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ICreateSpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): void;
    findByName(name: string): Specification;
}

export { ICreateSpecificationRepository, ICreateSpecificationDTO }