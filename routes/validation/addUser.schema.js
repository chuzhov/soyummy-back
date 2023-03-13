const Joi = require("joi");

const addUserSchema = Joi.object().keys({
  avatarURL:Joi.string(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ multiple: false })
    .required(),
});

module.exports = addUserSchema;
