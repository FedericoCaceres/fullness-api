import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport'
import Mongo from './services/mongo'
import router from './routes'

dotenv.config()
const port = process.env.PORT || 8000

const app = express()

app.use(
  session({
    secret: process.env.SECRET.toString(),
    resave: true, // por cada llamada que se haga en el servidor la informacion de la sesion se guarda en la db
    saveUninitialized: true // guarda en la db ese obj
  })
)
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(router)

Mongo.connect()
  .then(() => {
    app.listen(port, function () {
      console.log(`Hi Fede. Im listening on the port ${port}!`)
    })
  })
  .catch(err => {
    console.log(err)
  })
