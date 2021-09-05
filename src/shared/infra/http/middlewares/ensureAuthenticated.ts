import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UsersTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import auth from '../../../../config/auth'

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization
    const usersTokensRepository = new UsersTokensRepository()

    if (!authHeader) {
        throw new AppError('token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload

        const user = await usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

        if (!user) {
            throw new AppError('user does not exist', 401)
        }

        req.user = {
            id: user_id
        }

        next()
    } catch {
        throw new AppError('invalid token', 401)
    }
}