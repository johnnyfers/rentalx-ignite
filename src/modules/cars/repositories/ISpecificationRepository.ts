

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ICreateSpecificationRepository {
    create({ name, description }: ICreateSpecificationDTO): void;
}

export { ICreateSpecificationRepository, ICreateSpecificationDTO }