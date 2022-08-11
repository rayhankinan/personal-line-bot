import { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const jwtConfig: { secret: Secret } = {
    secret: process.env.JWT_SECRET_KEY
}