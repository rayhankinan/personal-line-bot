import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { User, UserRole } from '../models/user'
import { AuthToken } from '../middlewares/auth'

dotenv.config()

const secret: Secret = process.env.JWT_SECRET_KEY

class UserService {
    async token(username: string, password: string) {
        const user = new User()
        user.username = username
        user.password = password

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

        const { id, role } = foundUser
        const payload: AuthToken = {
            id,
            username, 
            password, 
            role
        }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })

        return token
    }

    async store(username: string, password: string, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const user = new User()
        user.username = username
        user.password = password

        await user.save()
    }

    async index(token: AuthToken) {
        // ADMIN ONLY
        if (token.role != UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const users = await User.find()

        return users
    }

    async show(id: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        if (token.role !== UserRole.ADMIN && token.id !== id) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const user = await User.findOne({
            where: { id },
            relations: ['assignments']
        })

        // USERS CAN SEE THEIR OWN PASSWORD
        if (token.role !== UserRole.ADMIN) {
            user.password = token.password
        }

        return user
    }

    async update(id: number, username: string, password: string, token: AuthToken) {
        // ADMIN AND USER ONLY
        if (token.role !== UserRole.ADMIN && token.id !== id) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const user = await User.findOne({
            where: { id }
        })
        user.username = username || user.username
        user.password = password || user.password

        await user.save()
    }

    async delete(id: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        if (token.role != UserRole.ADMIN && token.id !== id) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const user = await User.findOne({
            where: { id }
        })

        await user.remove()
    }
}

export const userService = new UserService()