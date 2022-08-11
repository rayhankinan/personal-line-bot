import { Client, ClientConfig, EventMessage, FlexMessage, TextEventMessage, TextMessage } from '@line/bot-sdk'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'

import { clientConfig } from '../config/line-config'
class WebhookService {
    client: Client

    constructor(clientConfig: ClientConfig) {
        this.client = new Client(clientConfig)
    }

    async message(replyToken: string, message: EventMessage) {
        const { text } = message as TextEventMessage
        const regex: RegExp = /ada deadline apa s?aja untuk ([A-Z]+) ([0-9]+) (.*)/i

        if (!regex.test(text)) {
            throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }

        const [ prodi, year, period ] = regex.exec(text)

        switch (period.toLowerCase()) {
            case 'hari ini':
                break

            case 'besok':
                break

            case 'minggu ini':
                break

            case 'minggu depan':
                break

            case 'bulan ini':
                break

            case 'sejauh ini':
                break

            default:
                throw createHttpError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST)
        }
    }

    async follow() {

    }

    async unfollow() {

    }

    async join() {

    }

    async leave() {

    }
}

export const webhookService = new WebhookService(clientConfig)