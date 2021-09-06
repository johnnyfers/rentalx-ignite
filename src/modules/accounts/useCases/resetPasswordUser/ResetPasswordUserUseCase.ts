import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject('UsersTokensRepository')
        private usersTokenRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,

        @inject('UserRepository')
        private usersRepository: IUserRepository,
    ){}

    async execute(token: string, password: string): Promise<void>{
        const userToken = await this.usersTokenRepository.findByRefreshToken(token)

        if(!userToken){
            throw new AppError('Token invalid!')
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError('Token expired')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        user.password = await hash(password, 8)

        await this.usersRepository.create(user)

        await this.usersTokenRepository.deleteById(userToken.id)
    }
}

export { ResetPasswordUserUseCase }