import { Router } from 'express'

import { webhookController } from '../controllers/webhook-controller'

export const webhookRoute = Router()
    .get('/', webhookController.default)