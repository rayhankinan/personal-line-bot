import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { userService } from '../services/user-service'
import { AuthRequest } from '../middlewares/auth'

class UserController {
    async token(req: Request, res: Response) {
        try {
            const { username, password }: { username: string, password: string } = req.body
            
            const token = await userService.token(username, password)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, token })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { username, password }: { username: string, password: string } = req.body
            const { token } = (req as AuthRequest)

            await userService.store(username, password, token)
            res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async index(req: Request, res: Response) {
        try {
            const { token } = (req as AuthRequest)

            const users = await userService.index(token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: users })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { token } = (req as AuthRequest)

            const user = await userService.show(parseInt(id, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: user })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { username, password }: { username: string, password: string } = req.body
            const { token } = (req as AuthRequest)

            await userService.update(parseInt(id, 10), username, password, token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { token } = (req as AuthRequest)

            await userService.delete(parseInt(id, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const userController = new UserController()