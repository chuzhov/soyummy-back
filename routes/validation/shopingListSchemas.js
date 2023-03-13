const Joi = require('joi');

const addToShopingListSchema = Joi.object().keys({
  ingridients: Joi.array().items({
    ingridientName: Joi.string().required(),
    number: Joi.string().required(),
    imgURL: Joi.string().required(),
  }),
});

const deleteFromShopingListSchema = Joi.object().keys({ ingridientName: Joi.string().required() });

module.exports = { addToShopingListSchema, deleteFromShopingListSchema };
