const { Recipe } = require("../../models");
const instance = require('../../helpers/instance');


const getOwnRecipeByID = async (req, res) => {
    const { id } = (req.params)
    
    const result = await Recipe.findById(id);
    const ingredientList = await instance.get('/list.php?i=list');
    const { ingredients } = result;
    const foundIngredients = [];


        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i].ingredient;
            const foundIngredient = ingredientList.data.meals.find(item => item.strIngredient === ingredient);
            if (foundIngredient) {
                foundIngredients.push(
                    {
                    ingredient: ingredients[i].ingredient, qty: ingredients[i].qty,
                    desc: foundIngredient.strDescription, imgURL: ingredients[i].imgURL
                    }
                );
            }
    };
    
    const {_doc} = {...result}
    const recipe = { ..._doc, ingredients: foundIngredients }

    res.json(recipe)
};

module.exports = getOwnRecipeByID;

