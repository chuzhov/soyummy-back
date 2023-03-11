const { Recipe } = require("../../models");

const {BASE_INGREDIENT_IMG_URL} = require('../../config/defaults');

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");


const addRecipe = async (req, res) => {
    
  const { _id } = req.user;
  const recipe = req.body
  const { ingredients } = req.body;
    
  const newArr = ingredients.map(obj => ({ ingredient: obj.ingredient,  qty: obj.qty, imgURL:`${BASE_INGREDIENT_IMG_URL}/${obj.ingredient.replace(/\s/g, '%20')}-Small.png` }));

  const conditions = newArr.map(obj => ({
    $elemMatch: obj
  }))

  const result = await Recipe.find({ ingredients: { $all: conditions } });

    if (result.length > 0) {
        throw HttpError(409, "Recipe is already created")
    }
    await Recipe.create({ ...recipe, owner: _id, ingredients: newArr} );
    res.status(201).send('Recipe created successfully');
};

module.exports = addRecipe;
