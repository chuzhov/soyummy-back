const Joi = require('joi');

const addToShoppingListSchema = Joi.object().keys({
  strIngredient: Joi.string().required(),
  weight: Joi.string().required(),
  image: Joi.string().required(),
});

module.exports = { addToShoppingListSchema };
