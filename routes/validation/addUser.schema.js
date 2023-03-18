const Joi = require('joi');

const addUserSchema = Joi.object().keys({
  name: Joi.string().min(1).max(16).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email({ multiple: false }).required(),
});

module.exports = addUserSchema;
