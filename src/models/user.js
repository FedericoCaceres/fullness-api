import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    } //,
    // hobbies: [
    //   {
    //     name: {
    //       type: String
    //     },
    //     description: {
    //       type: String
    //     }
    //   }
    // ],
    // studies: [
    //   {
    //     name: {
    //       type: String
    //     },
    //     description: {
    //       type: String
    //     },
    //     date: {
    //       type: Date
    //     }
    //   }
    // ]
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err)
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = (password, cb) => {
  bcrypt.compare(password, this.password, (err, areTheSame) => {
    if (err) {
      return cb(err)
    }
    cb(null, areTheSame)
  })
}

export const User = mongoose.model('user', userSchema, 'users')
