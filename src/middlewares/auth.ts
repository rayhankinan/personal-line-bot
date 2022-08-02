import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction} from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes' 
import dotenv from 'dotenv'

dotenv.config()

export const secret: Secret = process.env.JWT_SECRET_KEY

export interface AuthRequest extends Request {
    token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '')

        if (!token) {
            throw new Error()
        }

        (req as AuthRequest).token = jwt.verify(token, secret)

        next()
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }
}