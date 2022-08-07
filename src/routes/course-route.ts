import { Router } from 'express'

import { courseController } from '../controllers/course-controller'

export const courseRoute = Router()
    .post('/course', courseController.store)
    .get('/course', courseController.index)
    .get('/course/:id', courseController.show)
    .put('/course/:id', courseController.update)
    .delete('/course/:id', courseController.delete)