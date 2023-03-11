const Joi = require("joi");


const addRecipeSchema = Joi.object().keys({
    imgURL: Joi.string(),
    title: Joi.string().required(),
    about: Joi.string().required(),
    category: Joi.string().required(),
    coockingTime: Joi.string().required(),
    // ingredients: Joi.array().items({ ingredient: Joi.string().required(), qty: Joi.string().required() }),
    description: Joi.string().required(),
});

module.exports = addRecipeSchema;
