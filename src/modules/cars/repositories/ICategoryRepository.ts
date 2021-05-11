import { Category } from "../models/Category";


interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICreateCategoryRepository {
    create({ name, description }: ICreateCategoryDTO): void;
    findByName(name:string): Category;
    list():void;
}

export { ICreateCategoryRepository, ICreateCategoryDTO }