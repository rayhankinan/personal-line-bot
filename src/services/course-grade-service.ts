import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

import { CourseGrade } from '../models/course-grade'
import { UserRole } from '../models/user'
import { AuthToken } from '../middlewares/auth'

class CourseGradeService {
    async store(lecturer: string, courseId: number, gradeId: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const coursegrade = new CourseGrade()
        coursegrade.lecturer = lecturer
        coursegrade.courseId = courseId
        coursegrade.gradeId = gradeId

        await coursegrade.save()
    }

    async index() {
        // PUBLIC
        const coursegrades = await CourseGrade.find()

        return coursegrades
    }

    async show(id: number) {
        // PUBLIC
        const coursegrade = await CourseGrade.findOne({
            where: { id },
            relations: ['course', 'grade']
        })

        return coursegrade
    }

    async update(id: number, lecturer: string, courseId: number, gradeId: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const coursegrade = await CourseGrade.findOne({
            where: { id }
        })
        coursegrade.lecturer = lecturer
        coursegrade.courseId = courseId
        coursegrade.gradeId = gradeId

        await coursegrade.save()
    }

    async delete(id: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const coursegrade = await CourseGrade.findOne({
            where: { id }
        })

        await coursegrade.remove()
    }
}

export const coursegradeService = new CourseGradeService()