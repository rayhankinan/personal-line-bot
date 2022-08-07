import { Router } from 'express'

import { coursegradeController } from '../controllers/course-grade-controller'

export const coursegradeRoute = Router()
    .post('/course-grade', coursegradeController.store)
    .get('/course-grade', coursegradeController.index)
    .get('/course-grade/:id', coursegradeController.show)
    .put('/course-grade/:id', coursegradeController.update)
    .delete('/course-grade/:id', coursegradeController.delete)