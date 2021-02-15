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

userSchema.pre('save', async function () {
  const user = this
  if (!user.isModified('password')) {
    return
  }

  const hashedPassword = await bcrypt.hash(user.password, 8)
  console.log(user.password)
  console.log(hashedPassword)
  user.password = hashedPassword

  const isMatch = await bcrypt.compare('Fede123', hashedPassword)
  console.log(isMatch)
})

userSchema.methods.comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}

export const User = mongoose.model('user', userSchema, 'users')
