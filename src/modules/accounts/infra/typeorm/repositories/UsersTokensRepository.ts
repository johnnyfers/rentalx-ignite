import { IUsersTokensRepository } from "../../../repositories/IUsersTokensRepository";
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO'
import { UserTokens } from "../entities/UserTokens";
import { getRepository, Repository } from 'typeorm'
import { ICreateUserTokenDTO } from "../../../dtos/ICreateUserTokenDTO";

class UsersTokensRepository implements IUsersTokensRepository {

    private repository: Repository<UserTokens>

    constructor() {
        this.repository = getRepository(UserTokens)
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create({
            expires_date,
            refresh_token,
            user_id
        })

        await this.repository.save(userToken)

        return userToken
    }
}

export { UsersTokensRepository }
