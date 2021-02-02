import passport from 'passport'
// import LocalStrategy from 'passport-local'
import User from '../../models/user'

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async id => {
  return await User.findById(id)
})
