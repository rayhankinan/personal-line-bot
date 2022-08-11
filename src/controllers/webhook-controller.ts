import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import { WebhookRequestBody } from '@line/bot-sdk'

class WebhookController {
    async main(req: Request, res: Response) {
        try {
            const { events } = req.body as WebhookRequestBody

            events.forEach((event) => {
                switch (event.type) {
                    case 'message':
                        break

                    case 'follow':
                        break

                    case 'unfollow':
                        break

                    case 'join':
                        break

                    case 'leave':
                        break

                    default:
                        throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
                }
            })

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const webhookController = new WebhookController()