import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserRepository } from '../../repositories/IUserRepository'

class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ){}

    async execute({name, email, password, driver_license, username}: ICreateUserDTO): Promise<void>{
        await this.usersRepository.create(
            {
                name, 
                email, 
                password, 
                driver_license, 
                username
            }
        )
    }

}

export { CreateUserUseCase }