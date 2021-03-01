import jwt from 'jsonwebtoken'
import { User } from '../models/user'

export const Auth = async (req, res, next) => {
  try {
    const token = req.header('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET.toString())
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
    if (!user) {
      throw new Error()
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}
