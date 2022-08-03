import { Router } from 'express'

import { adminController } from '../controllers/admin-controller'

export const adminRoute = Router()
    .post('/admin/login', adminController.login)
    .post('/admin', adminController.store)