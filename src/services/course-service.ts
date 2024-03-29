import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

import { Course } from '../models/course'
import { UserRole } from '../models/user'
import { AuthToken } from '../middlewares/auth'

class CourseService {
    async store(code: string, title: string, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const course = new Course()
        course.code = code
        course.title = title

        await course.save()
    }

    async index() {
        // AUTHORIZED ONLY
        const courses = await Course.find({
            cache: true
        })

        return courses
    }

    async show(id: number) {
        // AUTHORIZED ONLY
        const course = await Course.findOne({
            where: { id },
            relations: {
                coursegrades: true
            },
            cache: true
        })

        return course
    }

    async update(id: number, code: string, title: string, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const course = await Course.findOne({
            where: { id },
            cache: true
        })
        course.code = code
        course.title = title

        await course.save()
    }

    async delete(id: number, token: AuthToken) {
        // ADMIN ONLY
        if (token.role !== UserRole.ADMIN) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const course = await Course.findOne({
            where: { id },
            cache: true
        })
        
        await course.remove()
    }
}

export const courseService = new CourseService()