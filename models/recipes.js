const { Schema, model } = require("mongoose");

const {DEFAULT_RECIPE_IMG_URL} = require('../config/defaults');

const recipeSchema = Schema({
    imgURL: {
        type: String,
        default: (DEFAULT_RECIPE_IMG_URL)
    },
    title: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    cookingTime: {
        type: String,
        required: true,
    },
    ingredients: 
        [{
            ingredient: {
                type: String,
                require: true,
            },
            qty: {
                type: String,
                require: true,
            },
            imgURL: {
                type: String,
                default: ''
            },
            _id: false
        }],
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const Recipe = model("Recipe", recipeSchema);

module.exports = {
    Recipe
};
