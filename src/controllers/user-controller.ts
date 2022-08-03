import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

import { User } from '../models/user'
import { userService } from '../services/user-service'
import { AuthRequest } from '../middlewares/auth'

class UserController {
    async token(req: Request, res: Response) {
        try {
            const { username, password } = req.body

            const user = new User()
            user.username = username
            user.password = password

            const token = await userService.token(user)

            res.status(StatusCodes.OK).json({ token })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { username, password } = req.body
            const { token } = (req as AuthRequest)

            if (!token) {
                throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
            }

            const user = new User()
            user.username = username
            user.password = password

            await userService.store(user)

            res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED})

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const userController = new UserController()