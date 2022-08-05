import { Router } from 'express'

import { courseController } from '../controllers/course-controller'
import { auth } from '../middlewares/auth'

export const courseRoute = Router()
    .post('/course', auth, courseController.store)
    .get('/course', auth, courseController.index)
    .get('/course/:id', auth, courseController.show)
    .put('/course/:id', auth, courseController.update)
    .delete('/course/:id', auth, courseController.delete)