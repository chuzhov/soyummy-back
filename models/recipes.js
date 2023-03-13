const { Schema, model } = require("mongoose");


const ingredientSchema = Schema(
    {
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
        description: {
            type: String,
            default: ''
        },
        id: {
            type: String
        },
        _id: false
    },
);


const recipeSchema = Schema({
    picture: {
        type: String,
        default: ""
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
        [ingredientSchema],
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
