import { Category } from "../entities/Category";


interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICreateCategoryRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    findByName(name:string): Promise<Category>;
    list(): Promise<void>;
}

export { ICreateCategoryRepository, ICreateCategoryDTO }