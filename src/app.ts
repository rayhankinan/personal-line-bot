import express, { Express } from 'express'
import 'reflect-metadata'

import { coursegradeRoute } from './routes/course-grade-route'
import { courseRoute } from './routes/course-route'
import { userRoute } from './routes/user-route'
import { webhookRoute } from './routes/webhook-route'

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
            coursegradeRoute,
            courseRoute,
            userRoute
        ])
    }
}

export const app = new App()