import * as Joi from 'joi';

const ERROR_MESSAGE = 'All fields must be filled';

const checkLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required().messages({
  'any.required': ERROR_MESSAGE,
  'string.empty': ERROR_MESSAGE,
  'string.email': ERROR_MESSAGE,
  'string.base': ERROR_MESSAGE,
});

export default checkLogin;
