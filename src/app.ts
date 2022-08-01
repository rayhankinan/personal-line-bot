import express, { Express } from 'express'
import { webhookRoute } from './routes/webhook.route'

class App {
    public server: Express

    constructor() {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(express.urlencoded({
            extended: true
        }))
    }

    routes() {
        this.server.use(webhookRoute)
    }
}

export const app = new App()