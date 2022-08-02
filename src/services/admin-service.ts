import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

import { Admin } from '../models/admin'

dotenv.config()

export const secret: Secret = process.env.JWT_SECRET_KEY

class AdminService {
    async login(admin: Admin) {
        const { username, password } = admin

        const foundAdmin = await Admin.findOne({
            where: { username }
        })

        if (!foundAdmin) {
            throw new Error('Username is incorrect!')
        }

        const isMatch = bcrypt.compareSync(password, foundAdmin.password)

        if (!isMatch) {
            throw new Error('Password is incorrect!')
        }

        const token = jwt.sign({ username, password }, secret, { expiresIn: '1h'})

        return token
    }

    async register(admin: Admin) {

    }
}