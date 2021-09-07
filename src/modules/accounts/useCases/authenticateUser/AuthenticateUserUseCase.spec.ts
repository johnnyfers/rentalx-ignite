import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implemantaions/DayjsDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider

describe('Authenticate user', ()=>{

    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider)
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    })

    it('it should be to auth an user', async ()=>{
        const user: ICreateUserDTO = {
             username: 'username',
             driver_license: '000123',
             email: 'user@example.com',
             password: '123',
             name: 'user'
        }
        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({email: user.email, password: user.password})

        expect(result).toHaveProperty('token')
    })

    it('should not to be able to auth an non existing user', ()=>{
        expect(async ()=> {
            await authenticateUserUseCase.execute({email: 'fake@fake.com', password: '1234'})
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not to be able to authenticate with an incorrect password', ()=>{
        expect(async ()=>{
            const user: ICreateUserDTO = {
                username: 'uuu',
                driver_license: '9999',
                email: 'user@9999.com',
                password: '12345',
                name: 'user test error'
           }

           await createUserUseCase.execute(user)

           await authenticateUserUseCase.execute({email: user.email, password: 'incorrect'})

        }).rejects.toBeInstanceOf(AppError)
    })


})