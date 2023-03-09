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
        enum: 
            [
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
            ],
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
    recipe: {
        type: String,
        required: true,
    }
});

const Recipe = model("Recipe", recipeSchema);

module.exports = {
    Recipe
};
