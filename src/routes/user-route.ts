import { Router } from 'express'

import { userController } from '../controllers/user-controller'
import { auth } from '../middlewares/auth'

export const userRoute = Router()
    .post('/user/token', userController.token)
    .post('/user', auth, userController.store)
    .get('/user', auth, userController.index)
    .get('/user/:id', auth, userController.show)
    .put('/user/:id', auth, userController.update)
    .delete('/user/:id', auth, userController.delete)