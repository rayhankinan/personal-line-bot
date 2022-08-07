import { Router } from 'express'

import { userController } from '../controllers/user-controller'

export const userRoute = Router()
    .post('/user/token', userController.token)
    .post('/user', userController.store)
    .get('/user', userController.index)
    .get('/user/:id', userController.show)
    .put('/user/:id', userController.update)
    .delete('/user/:id', userController.delete)