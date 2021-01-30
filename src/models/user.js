import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  hobbies: [
    {
      name: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  studies: [
    {
      name: {
        type: String
      },
      description: {
        type: String
      },
      date: {
        type: Date
      }
    }
  ]
})

export const User = mongoose.model(
  'user',
  userSchema,
  'users'
)
