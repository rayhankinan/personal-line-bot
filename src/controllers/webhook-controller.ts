import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

class WebhookController {
    async default(req: Request, res: Response) {
        return res.status(StatusCodes.OK).send('Hello World')
    }
}

export const webhookController =  new WebhookController()