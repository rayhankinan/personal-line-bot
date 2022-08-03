import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import dotenv from 'dotenv'

import { getErrorMessage } from '../utils/error-util'

dotenv.config()

export const secret: Secret = process.env.JWT_SECRET_KEY

export interface AuthRequest extends Request {
    token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '')

        if (!token) {
            throw new Error(ReasonPhrases.UNAUTHORIZED)
        }

        (req as AuthRequest).token = jwt.verify(token, secret)
        next()

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send(getErrorMessage(error))
    }
}