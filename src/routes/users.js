import { Router } from 'express'
import { Users } from '../controllers/user'
import { Auth } from '../middleware/auth'

const userRoute = Router()

userRoute.post('/', Users.SIGNUP)

userRoute.post('/login', Users.LOGIN)

userRoute.patch('/:id', Users.UPDATE)

userRoute.get('/me', Auth, Users.GET)

export default userRoute
