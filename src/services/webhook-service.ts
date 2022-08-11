import { Client, ClientConfig, WebhookEvent } from '@line/bot-sdk'

import { clientConfig } from '../config/line-config'
class WebhookService {
    client: Client

    constructor(clientConfig: ClientConfig) {
        this.client = new Client(clientConfig)
    }

    async message() {

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