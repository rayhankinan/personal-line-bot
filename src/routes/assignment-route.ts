import { Router } from 'express'

import { assignmentController } from '../controllers/assignment-controller'
import { auth } from '../middlewares/auth'

export const assignmentRoute = Router()
    .post('/assignment', auth, assignmentController.store)
    .get('/assignment', auth, assignmentController.index)
    .get('/assignment/:id', auth, assignmentController.show)
    .put('/assignment/:id', auth, assignmentController.update)
    .delete('/assignment/:id', auth, assignmentController.delete)