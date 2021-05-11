

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICreateCategoryRepository {
    create({ name, description }: ICreateCategoryDTO): void;
    list():void;
}

export { ICreateCategoryRepository, ICreateCategoryDTO }