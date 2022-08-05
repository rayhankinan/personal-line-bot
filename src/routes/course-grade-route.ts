import { Router } from 'express'

import { coursegradeController } from '../controllers/course-grade-controller'
import { auth } from '../middlewares/auth'

export const coursegradeRoute = Router()
    .post('/course-grade', auth, coursegradeController.store)
    .get('/course-grade', auth, coursegradeController.index)
    .get('/course-grade/:id', auth, coursegradeController.show)
    .put('/course-grade/:id', auth, coursegradeController.update)
    .delete('/course-grade/:id', auth, coursegradeController.delete)