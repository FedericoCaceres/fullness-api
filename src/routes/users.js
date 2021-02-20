import { Router } from 'express'
import { Users } from '../controllers/user'

const userRoute = Router()

userRoute.post('/', Users.SIGNUP)

userRoute.post('/login', Users.LOGIN)

userRoute.patch('/:id', Users.UPDATE)

export default userRoute
