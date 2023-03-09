const { Schema, model } = require("mongoose");

const recipeSchema = Schema({
    img: {
        type: String,
        default: "mills"
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
    coockingTime: {
        type: String,
        required: true,
    },
    ingridients: 
            [{
                ingredient: {
                    type: String,
                    require: true,
                },
                qty: {
                    type: String,
                    require: true,
                }
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
