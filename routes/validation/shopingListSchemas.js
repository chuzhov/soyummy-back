const Joi = require('joi');

const addToShopingListSchema = Joi.object().keys({
  strIngredient: Joi.string().required(),
  weight: Joi.string().required(),
  image: Joi.string().required(),
  idIngredient: Joi.string().required(),
});

module.exports = { addToShopingListSchema };
