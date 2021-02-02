import { Router } from 'express'
import { User } from '../models/user'

const router = Router()

router.get('/', async (req, res) => {
  const usuario = new User({
    name: 'Fede',
    lastName: 'Cáceres',
    email: 'fedecaceress@hotmail.com',
    password: 'Fede123'
  })

  await usuario.save()

  req.session.account = req.session.account ? req.session.account + 1 : 1
  // res.send({ message: 'Hello ! This is my users API' })
  res.send(
    `Cantidad de veces que entraste a esta pagina ${req.session.account}`
  )
})

router.use((req, res) => {
  res.status(404).send('Not found. Sorry :(')
})

router.use((req, res) => {
  res.status(500).send('Oops! There was an error. Sorry :(')
})

export default router
