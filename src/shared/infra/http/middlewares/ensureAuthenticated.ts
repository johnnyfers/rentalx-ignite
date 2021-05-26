import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppError } from '../../../errors/AppError'
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError('token missing', 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, 'a7e071b3de48cec1dd24de6cbe6c7bf1') as IPayload

        const usersRepository = new UserRepository()
        const user = await usersRepository.findById(user_id)

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