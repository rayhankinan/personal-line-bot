import { StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { User } from '../models/user'

dotenv.config()

export const secret: Secret = process.env.JWT_SECRET_KEY

class UserService {
    async token(user: User) {
        const { username, password } = user

        const foundUser = await User.findOne({
            where: { username }
        })
        if (!foundUser) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, 'Username is incorrect!')
        }

        const isMatch = bcrypt.compareSync(password, foundUser.password)
        if (!isMatch) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, 'Password is incorrect!')
        }

        const { role } = foundUser
        const token = jwt.sign({ 
                username, 
                password, 
                role 
            }, secret, { 
                expiresIn: '1h'
            }
        )

        return token
    }

    async store(user: User) {
        await user.save()
    }
}

export const userService = new UserService()