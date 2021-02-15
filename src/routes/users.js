import { Router } from 'express'
import { Auth } from '../controllers/auth'

const userRoute = Router()

userRoute.post('/', Auth.SIGNUP)

export default userRoute
