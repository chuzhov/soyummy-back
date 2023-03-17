const Joi = require('joi');

const subscribeUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

module.exports = subscribeUserSchema;
