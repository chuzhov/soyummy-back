const Joi = require("joi");

const validCategory = [
    "Beef",
    "Breakfast",
    "Chicken",
    "Dessert",
    "Goat",
    "Lamb",
    "Miscellaneous",
    "Pasta",
    "Pork",
    "Seafood",
    "Side",
    "Starter",
    "Vegan",
    "Vegetarian"
];


const addRecipeSchema = Joi.object().keys({
    img: Joi.string,
    title: Joi.string().required(),
    about: Joi.string().required(),
    category: Joi.string().valid(...validCategory).required(),
    coockingTime: Joi.string().required(),
    ingridients: Joi.array().items({ ingredient: Joi.string().required(), qty: Joi.string().required() }),
    recipe: Joi.string().required(),
});

module.exports = addRecipeSchema;
