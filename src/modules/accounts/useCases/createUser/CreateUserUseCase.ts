import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserRepository } from '../../repositories/IUserRepository'
import { hash } from 'bcrypt'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ){}

    async execute({name, email, password, driver_license, username}: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists) {
            throw new Error('User already exists')
        }

        const passwordHash = await hash(password, 8);
        
        await this.usersRepository.create(
            {
                name, 
                email,
                password: passwordHash, 
                driver_license, 
                username
            }
        )
    }
}

export { CreateUserUseCase }