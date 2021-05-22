import { IUserRepository } from "../IUserRepository";
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from "../../entities/User";
import { getRepository, Repository } from 'typeorm'

class UserRepository implements IUserRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User)
    }

    async create({ name, username, password, driver_license, email }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            username,
            password,
            driver_license,
            email
        })

        await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User>{
        const user = await this.repository.findOne({email})
        return user
    }

    async findById(id: string): Promise<User>{
        const user = await this.repository.findOne(id)
        return user
    }
}

export { UserRepository }
