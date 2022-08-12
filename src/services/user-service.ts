import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { User, UserRole } from '../models/user'
import { AuthToken } from '../middlewares/auth'
import { jwtConfig } from '../config/jwt-config'

const secret: Secret = jwtConfig.secret

class UserService {
    async token(username: string, password: string) {
        const user = new User()
        user.username = username
        user.password = password

        const foundUser = await User.findOne({
            where: { username },
            cache: true
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

        const users = await User.find({
            cache: true
        })

        return users
    }

    async show(id: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        if (token.role !== UserRole.ADMIN && token.id !== id) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const user = await User.findOne({
            where: { id },
            relations: {
                assignments: true
            },
            cache: true
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
            where: { id },
            cache: true
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
            where: { id },
            cache: true
        })

        await user.remove()
    }
}

export const userService = new UserService()