import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { courseService } from '../services/course-service'
import { AuthRequest } from '../middlewares/auth'

class CourseController {
    async store(req: Request, res: Response) {
        try {
            const { code, title }: { code: string, title: string } = req.body
            const { token } = (req as AuthRequest)

            await courseService.store(code, title, token)
            res.status(StatusCodes.CREATED).json({ message: ReasonPhrases.CREATED })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async index(req: Request, res: Response) {
        try {
            const courses = await courseService.index()
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: courses })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params

            const course = await courseService.show(parseInt(id, 10))
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, data: course })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { code, title }: { code: string, title: string } = req.body
            const { token } = (req as AuthRequest)

            await courseService.update(parseInt(id, 10), code, title, token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { token } = (req as AuthRequest)

            await courseService.delete(parseInt(id, 10), token)
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
            
        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const courseController = new CourseController()