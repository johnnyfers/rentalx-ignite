import { Specification } from '../entities/Specification'
import { ICreateSpecificationDTO, ICreateSpecificationRepository } from '../../../repositories/ISpecificationRepository'
import { getRepository, Repository } from 'typeorm'

class SpecificationRepository implements ICreateSpecificationRepository {

    private Repository: Repository<Specification>

    constructor() {
        this.Repository = getRepository(Specification)
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.Repository.create(
            {
                name,
                description
            }
        )

        await this.Repository.save(specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.Repository.findOne({name})

        return specification
    }
}

export { SpecificationRepository }