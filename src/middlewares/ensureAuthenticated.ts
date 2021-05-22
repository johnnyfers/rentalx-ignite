import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '../modules/accounts/repositories/implementations/UsersRepository'

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new Error('token missing')
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, 'a7e071b3de48cec1dd24de6cbe6c7bf1') as IPayload

        const usersRepository = new UserRepository()
        const user = await usersRepository.findById(user_id)

        if (!user) {
            throw new Error('user does not exist')
        }

        next()
    } catch {
        throw new Error('invalid token')
    }
}