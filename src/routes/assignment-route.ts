import { Router } from 'express'

import { assignmentController } from '../controllers/assignment-controller'

export const assignmentRoute = Router()
    .post('/assignment', assignmentController.store)
    .get('/assignment', assignmentController.index)
    .get('/assignment/:id', assignmentController.show)
    .put('/assignment/:id', assignmentController.update)
    .delete('/assignment/:id', assignmentController.delete)