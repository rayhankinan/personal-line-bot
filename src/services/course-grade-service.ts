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
        // AUTHORIZED ONLY
        const coursegrades = await CourseGrade.find({
            cache: true
        })

        return coursegrades
    }

    async show(id: number) {
        // AUTHORIZED ONLY
        const coursegrade = await CourseGrade.findOne({
            where: { id },
            relations: {
                course: true,
                grade: true
            },
            cache: true
        })

        return coursegrade
    }

    async update(id: number, lecturer: string, courseId: number, gradeId: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const coursegrade = await CourseGrade.findOne({
            where: { id },
            cache: true
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
            where: { id },
            cache: true
        })

        await coursegrade.remove()
    }
}

export const coursegradeService = new CourseGradeService()