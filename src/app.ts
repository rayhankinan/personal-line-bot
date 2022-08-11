import express, { Express } from 'express'
import { middleware } from '@line/bot-sdk'
import 'reflect-metadata'

import { assignmentRoute } from './routes/assignment-route'
import { courseRoute } from './routes/course-route'
import { coursegradeRoute } from './routes/course-grade-route'
import { gradeRoute } from './routes/grade-route'
import { userRoute } from './routes/user-route'
import { webhookRoute } from './routes/webhook-route'
import { middlewareConfig } from './config/line-config'
import { auth } from './middlewares/auth'

class App {
    server: Express

    constructor() {
        this.server = express()

        this.addLineBot()
        this.addAPI()
    }

    addLineBot() {
        this.server.use(
            '/webhook', 
            [
                middleware(middlewareConfig),
                express.json(), 
                express.urlencoded({ 
                    extended: true 
                })
            ], 
            [
                webhookRoute
            ]
        )
    }

    addAPI() {
        this.server.use(
            '/api', 
            [
                express.json(), 
                express.urlencoded({ extended: true }),
                auth
            ], 
            [
                assignmentRoute,
                courseRoute,
                coursegradeRoute,
                gradeRoute,
                userRoute
            ]
        )
    }
}

export const app = new App()