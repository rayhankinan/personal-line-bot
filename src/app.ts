import express, { Express } from 'express'
import 'reflect-metadata'

import { webhookRoute } from './routes/webhook-route'
import { adminRoute } from './routes/admin-route'

class App {
    server: Express

    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(
            express.json(), 
            express.urlencoded({
                extended: true
            })
        )
    }

    routes() {
        this.server.use('/webhook', [
            webhookRoute
        ])
        this.server.use('/api', [
            adminRoute
        ])
    }
}

export const app = new App()