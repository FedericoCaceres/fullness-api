import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
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
      unique: true,
      type: String
    },
    password: {
      type: String
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ] //,
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

// Hash the plain text password before saving
userSchema.pre('save', async function () {
  const user = this
  if (!user.isModified('password')) {
    return
  }
  const hashedPassword = await bcrypt.hash(user.password, 8)
  user.password = hashedPassword
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const secretKey = process.env.SECRET.toString()
  const token = jwt.sign({ _id: user._id.toString() }, secretKey)

  await user.tokens.push({ token })
  await user.save()

  return token
}

userSchema.statics.comparePassword = async (email, password) => {
  const user = await User.findOne({ email: email })
  if (!user) {
    throw new Error('Unable to Login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

export const User = mongoose.model('user', userSchema, 'users')
