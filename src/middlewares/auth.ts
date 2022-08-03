import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import dotenv from 'dotenv'

import { UserRole } from '../models/user'

dotenv.config()

const secret: Secret = process.env.JWT_SECRET_KEY

export interface AuthRequest extends Request {
    token: AuthToken
}

export interface AuthToken {
    id: number
    username: string
    password: string
    role: UserRole
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        (req as AuthRequest).token = jwt.verify(token, secret) as AuthToken

        next()

    } catch (error) {
        res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
    }
}