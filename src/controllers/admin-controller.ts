import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { Admin } from '../models/admin'
import { adminService } from '../services/admin-service'

class AdminController {
    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body

            const admin = new Admin()
            admin.username = username
            admin.password = password

            const tokenAdmin = await adminService.login(admin)

            res.status(StatusCodes.OK).json({ token: tokenAdmin })

        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).send(error)
        }
    }

    async store(req: Request, res: Response) {
        try {
            const { username, password } = req.body

            const admin = new Admin()
            admin.username = username
            admin.password = password

            await adminService.store(admin)

            res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED)

        } catch (error) {
            res.status(StatusCodes.CONFLICT).send(error)
        }
    }
}

export const adminController = new AdminController()