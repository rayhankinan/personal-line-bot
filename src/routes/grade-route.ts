import { Router } from 'express'

import { gradeController } from '../controllers/grade-controller'

export const gradeRoute = Router()
    .post('/grade', gradeController.store)
    .get('/grade', gradeController.index)
    .get('/grade/:id', gradeController.show)
    .put('/grade/:id', gradeController.update)
    .delete('/grade/:id', gradeController.delete)