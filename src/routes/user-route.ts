import { Router } from 'express'

import { userController } from '../controllers/user-controller'
import { auth } from '../middlewares/auth'

export const userRoute = Router()
    .post('/user/token', userController.token)
    .post('/user', auth, userController.store)