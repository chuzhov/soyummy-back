const Joi = require("joi");


const addRecipeSchema = Joi.object().keys({
    imgURL: Joi.string(),
    title: Joi.string().required(),
    about: Joi.string().required(),
    category: Joi.string().required(),
    cookingTime: Joi.string().required(),
    ingredients: Joi.array().items({ ingredient: Joi.string().required(), qty: Joi.string().required(), imgURL:Joi.string()}),
    description: Joi.string().required(),
});

module.exports = addRecipeSchema;
