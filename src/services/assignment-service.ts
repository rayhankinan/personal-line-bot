import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

import { Assignment } from '../models/assignment'
import { UserRole } from '../models/user'
import { AuthToken } from '../middlewares/auth'

class AssigmentService {
    async store(title: string, description: string, deadline: Date, userId: number, coursegradeId: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        if (token.role !== UserRole.ADMIN && token.id !== userId) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const assignment = new Assignment()
        assignment.title = title
        assignment.description = description
        assignment.deadline = deadline
        assignment.userId = userId
        assignment.coursegradeId = coursegradeId

        await assignment.save()
    }

    async index(token: AuthToken) {
        // ADMIN AND USER ONLY
        const assignments = await Assignment.find({
            where: { userId: token.role !== UserRole.ADMIN ? token.id : undefined }
        })

        return assignments
    }

    async show(id: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        const assignment = await Assignment.findOne({
            where: { id },
            relations: ['user', 'coursegrade']
        })

        if (token.role !== UserRole.ADMIN && token.id !== assignment.userId) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        return assignment
    }

    async update(id: number, title: string, description: string, deadline: Date, userId: number, coursegradeId: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        if (token.role !== UserRole.ADMIN && token.id !== userId) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        const assignment = await Assignment.findOne({
            where: { id }
        })
        assignment.title = title
        assignment.description = description
        assignment.deadline = deadline
        assignment.userId = userId
        assignment.coursegradeId = coursegradeId

        await assignment.save()
    }

    async delete(id: number, token: AuthToken) {
        // ADMIN AND USER ONLY
        const assignment = await Assignment.findOne({
            where: { id }
        })

        if (token.role !== UserRole.ADMIN && token.id !== assignment.userId) {
            throw createHttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
        }

        await assignment.remove()
    }
}

export const assignmentService = new AssigmentService()