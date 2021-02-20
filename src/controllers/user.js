import { User } from '../models/user'
import { validator } from '../services/validations/user'
export class Users {
  static async SIGNUP(req, res) {
    const userReq = req.body
    try {
      const isValidated = await validator(userReq)
      if (!isValidated.success) {
        res
          .status(400)
          .send({ message: 'An error ocurred', error: isValidated })
      }
      const user = new User({
        name: userReq.name,
        lastName: userReq.lastName,
        email: userReq.email,
        password: userReq.password
      })

      const lastUser = await user.save()
      const token = await lastUser.generateAuthToken()

      res.send(lastUser, token)
    } catch (error) {
      res.status(400).send({ message: 'An error ocurred', error: error })
    }
  }

  static async LOGIN(req, res) {
    try {
      const isValidAccount = await User.comparePassword(
        req.body.email,
        req.body.password
      )
      res.send(isValidAccount)
    } catch (error) {
      res.status(401).send()
    }
  }

  static async UPDATE(req, res) {
    const updates = Object.keys(req.body)
    const allowUpdates = ['name', 'lastName', 'email']
    const isValidOperation = updates.every(update =>
      allowUpdates.includes(update)
    )

    if (!isValidOperation) {
      return res.status(404).send()
    }

    try {
      // const user = await User.findById(req.params.id)
      // updates.forEach(update => {
      //   user[update] = req.body[update]
      // })
      await User.findByIdAndUpdate(req.params.id, req.body)
      // await user.save()
      res.send('The user was updated correctly')
    } catch (error) {
      res.status(400).send()
    }
  }
}
