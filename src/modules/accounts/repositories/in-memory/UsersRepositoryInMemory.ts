import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";


class UsersRepositoryInMemory implements IUserRepository{
    users: User[] = [];
    
    async create({driver_license, email, password, name, username}: ICreateUserDTO): Promise<void> {
       const user = new User()

       Object.assign(user, {
        driver_license, email, password, name, username
       })

       this.users.push(user)
    }
   
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email)

        return user
    }
    
    async findById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id)

        return user
    }
    
}

export { UsersRepositoryInMemory }