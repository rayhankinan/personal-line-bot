import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { assignmentService } from '../services/assignment-service'
import { AuthRequest } from '../middlewares/auth'

class AssignmentController {
    async store(req: Request, res: Response) {
        try {
            const { title, description, deadline, userId, coursegradeId } = req.body
            const { token } = (req as AuthRequest)

            await assignmentService.store(title, description, new Date(deadline), parseInt(userId, 10), parseInt(coursegradeId, 10), token)
            res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async index(req: Request, res: Response) {
        try {
            const { token } = (req as AuthRequest)

            const assignments = await assignmentService.index(token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: assignments })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { token } = (req as AuthRequest)

            const assignment = await assignmentService.show(parseInt(id, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: assignment })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { title, description, deadline, userId, coursegradeId } = req.body
            const { token } = (req as AuthRequest)

            await assignmentService.update(parseInt(id, 10), title, description, new Date(deadline), parseInt(userId, 10), parseInt(coursegradeId, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { token } = (req as AuthRequest)

            await assignmentService.delete(parseInt(id, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const assignmentController = new AssignmentController()