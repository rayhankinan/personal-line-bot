import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { coursegradeService } from '../services/course-grade-service'
import { AuthRequest } from '../middlewares/auth'

class CourseGradeController {
    async store(req: Request, res: Response) {
        try {
            const { lecturer, courseId, gradeId }: { lecturer: string, courseId: number, gradeId: number } = req.body
            const { token } = (req as AuthRequest)

            await coursegradeService.store(lecturer, courseId, gradeId, token)
            res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async index(req: Request, res: Response) {
        try {
            const coursegrades = await coursegradeService.index()
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: coursegrades })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params

            const coursegrade = await coursegradeService.show(parseInt(id, 10))
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: coursegrade })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { lecturer, courseId, gradeId }: { lecturer: string, courseId: number, gradeId: number } = req.body
            const { token } = (req as AuthRequest)

            await coursegradeService.update(parseInt(id, 10), lecturer, courseId, gradeId, token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK})

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { token } = (req as AuthRequest)

            await coursegradeService.delete(parseInt(id, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK})

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const coursegradeController = new CourseGradeController()