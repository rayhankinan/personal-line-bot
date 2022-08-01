import { Request, Response } from 'express'

class WebhookController {
    async default(req: Request, res: Response) {
        return res.json({ message: "Hello World"})
    }
}

export const webhookController =  new WebhookController()