import { Router } from 'express'
import userRoute from './users'

const router = Router()

router.get('/', async (req, res) => {
  req.session.account = req.session.account ? req.session.account + 1 : 1
  res.send({
    message: 'Hello ! This is my users API',
    session: req.session.account
  })
})

router.use('/user', userRoute)

router.use((req, res) => {
  res.status(404).send('Not found. Sorry :(')
})

router.use((req, res) => {
  res.status(500).send('Oops! There was an error. Sorry :(')
})

export default router
