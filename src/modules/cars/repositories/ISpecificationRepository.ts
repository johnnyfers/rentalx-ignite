import { Specification } from "../infra/typeorm/entities/Specification";


interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ICreateSpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationRepository, ICreateSpecificationDTO }