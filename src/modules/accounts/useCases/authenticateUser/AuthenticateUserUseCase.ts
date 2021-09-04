import { inject, injectable } from "tsyringe"
import { IUserRepository } from "../../repositories/IUserRepository"
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user:{
        name: string;
        email: string;
    }
    refresh_token: string;
    token: string;
}

@injectable()
class AuthenticateUserUseCase{
    constructor (
        @inject('UserRepository')
        private usersRepository: IUserRepository,

        @inject('UsersTokensRepository')
        private usersTokesRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,
    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new  AppError('email or password incorrect');
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new AppError('email or password incorrect');
        }

        const token = sign({}, auth.secret_token,{
            subject: user.id,
            expiresIn: auth.expires_in_token
        })

        const refresh_token = sign({ email }, auth.secret_refresh_token ,{
            subject: user.id,
            expiresIn: auth.expires_in_refresh_token
        })

        const expires_date = this.dayjsDateProvider.addDays(auth.expires_in_refresh_token_in_days)

        await this.usersTokesRepository.create({
            expires_date,
            refresh_token,
            user_id: user.id,
        })

        const tokenReturn: IResponse =  {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email,
            }
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }