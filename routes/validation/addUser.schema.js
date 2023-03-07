const Joi = require("joi");

const addUserSchema = Joi.object().keys({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ multiple: false })
    .required(),
});

module.exports = addUserSchema;
