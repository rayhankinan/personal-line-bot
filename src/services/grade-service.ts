import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

import { Grade } from '../models/grade'
import { UserRole } from '../models/user'
import { AuthToken } from '../middlewares/auth'

class GradeService {
    async store(major: string, year: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const grade = new Grade()
        grade.major = major
        grade.year = year

        await grade.save()
    }

    async index() {
        // PUBLIC
        const grades = await Grade.find()

        return grades
    }

    async show(id: number) {
        // PUBLIC
        const grade = await Grade.findOne({
            where: { id },
            relations: ['coursegrades']
        })

        return grade
    }

    async update(id: number, major: string, year: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const grade = await Grade.findOne({
            where: { id }
        })
        grade.major = major
        grade.year = year

        await grade.save()
    }

    async delete(id: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const grade = await Grade.findOne({
            where: { id }
        })

        await grade.remove()
    }
}

export const gradeService = new GradeService()