import { Category } from "../../entities/Category";
import { ICreateCategoryDTO, ICreateCategoryRepository } from "../ICategoryRepository";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICreateCategoryRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category)
    }


    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name, description
        })

        await this.repository.save(category)
    }

    async list(): Promise<void> {
        const categories = await this.repository.find();

        return categories
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({name})

        return category
    }
};

export { CategoriesRepository }