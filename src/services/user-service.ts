import { StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { User } from '../models/user'
import { AuthToken } from '../middlewares/auth'

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
        const payload: AuthToken = {
            username, 
            password, 
            role
        }

        const token = jwt.sign(payload, secret, { expiresIn: '1h' })

        return token
    }

    async store(user: User) {
        await user.save()
    }

    async index() {
        const users = await User.find()

        return users
    }

    async show(id: number) {
        const user = await User.findOne({
            where: { id },
            relations: ['assignments']
        })

        return user
    }

    async update(id: number, username: string, password: string) {
        const user = await User.findOne({
            where: { id }
        })

        user.username = username || user.username
        user.password = password || user.password

        await user.save()
    }

    async delete(id: number) {
        const user = await User.findOne({
            where: { id }
        })

        await user.remove()
    }
}

export const userService = new UserService()