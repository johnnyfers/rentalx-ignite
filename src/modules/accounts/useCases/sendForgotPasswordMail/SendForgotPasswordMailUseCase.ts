import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { resolve } from 'path'
import { v4 as uuidV4 } from 'uuid'
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject('UserRepository')
        private usersRepository: IUserRepository,

        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dayjsDateProvider: IDateProvider,

        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider,
    ) { }

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        const templatePath= resolve(__dirname, '..', '..', 'Views', 'emails', 'forgotPassword.hbs')

        if (!user) {
            throw new AppError('User does not exists')
        }

        const token = uuidV4()

        const expires_date = this.dayjsDateProvider.addHours(3)

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })

        const vars = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(email, 'Password Recovery', vars, templatePath)
    }
}

export { SendForgotPasswordMailUseCase }