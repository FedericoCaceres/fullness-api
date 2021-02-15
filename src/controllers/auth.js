import { User } from '../models/user'
import { validator } from '../services/validations/user'
export class Auth {
  static async SIGNUP(req, res) {
    const userReq = req.body
    console.log(userReq)
    try {
      const isValidated = await validator(userReq)
      if (!isValidated.success) {
        return isValidated
      }
      const user = new User({
        name: userReq.name,
        lastName: userReq.lastName,
        email: userReq.email,
        password: userReq.password
      })

      await user.save()

      res.send('The user was created correctly')
    } catch (error) {
      res.send('An error ocurred.', error)
    }
  }
}
