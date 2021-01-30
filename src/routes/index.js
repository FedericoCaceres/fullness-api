import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send({ message: 'Hello ! This is my users API' })
})

router.use((req, res) => {
    res.status(404).send('Not found. Sorry :(')
  })
  
  router.use((req, res) => {
    res.status(500).send('Oops! There was an error. Sorry :(')
  })
  
  export default router