const Joi = require('joi');

const loginUserSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string().email({ multiple: false }).required(),
});

module.exports = loginUserSchema;
