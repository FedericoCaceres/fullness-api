import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../../models/user'

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async id => {
  return await User.findById(id)
})

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    (email, password, done) => {
      User.findOne({ email }, (er, usuario) => {
        if (!usuario) {
          return done(null, false, { message: 'El email no está registrado' })
        } else {
          usuario.comparePassword(password, (er, areTheSame) => {
            if (areTheSame) {
              return done(null, usuario)
            } else {
              return done(null, false, {
                message: 'La contraseña no es valida'
              })
            }
          })
        }
      })
    }
  )
)

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(401).send('Tienes que hacer login para acceder al recurso')
  }
}
