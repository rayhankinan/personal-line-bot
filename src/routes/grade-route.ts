import { Router } from 'express'

import { gradeController } from '../controllers/grade-controller'
import { auth } from '../middlewares/auth'

export const gradeRoute = Router()
    .post('/grade', auth, gradeController.store)
    .get('/grade', gradeController.index)
    .get('/grade/:id', gradeController.show)
    .put('/grade/:id', auth, gradeController.update)
    .delete('/grade/:id', auth, gradeController.delete)