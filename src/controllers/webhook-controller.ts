import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import { WebhookRequestBody } from '@line/bot-sdk'

import { webhookService } from '../services/webhook-service'

class WebhookController {
    async main(req: Request, res: Response) {
        try {
            const { events } = req.body as WebhookRequestBody

            for (const event of events) {
                switch (event.type) {
                    case 'message':
                        const { message, replyToken } = event

                        await webhookService.message(replyToken, message)

                        res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
                        break

                    case 'follow':
                        res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
                        break

                    case 'unfollow':
                        res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
                        break

                    case 'join':
                        res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
                        break

                    case 'leave':
                        res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK })
                        break

                    default:
                        throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
                }
            }

        } catch (error) {
            res.status(error?.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR })
        }
    }
}

export const webhookController = new WebhookController()