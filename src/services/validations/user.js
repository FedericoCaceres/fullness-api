import Joi from 'joi'

const UserValidation = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
})

export const validator = async data => {
  const result = UserValidation.validate(data, {
    allowUnknown: true
  })
  if (result.error) {
    return {
      success: false,
      message: result.error.details
    }
  } else {
    return {
      success: true,
      message: 'Verified correctly'
    }
  }
}
