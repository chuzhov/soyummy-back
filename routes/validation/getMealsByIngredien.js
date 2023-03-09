const Joi = require("joi");

const getMealsByIngredien = Joi.object().keys({
    ingredient: Joi.string()
});

module.exports = getMealsByIngredien;