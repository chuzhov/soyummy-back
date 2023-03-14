const Joi = require("joi");

const updateUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  picture: Joi.binary(),
});

module.exports = updateUserSchema;