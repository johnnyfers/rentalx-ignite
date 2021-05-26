import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserRepository } from '../../repositories/IUserRepository'
import { hash } from 'bcrypt'
import { AppError } from '../../../../shared/errors/AppError'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository
    ){}

    async execute({name, email, password, driver_license, username}: ICreateUserDTO): Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if(userAlreadyExists) {
            throw new AppError('User already exists')
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