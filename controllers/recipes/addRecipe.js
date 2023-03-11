const { Recipe } = require("../../models");

const {BASE_INGREDIENT_IMG_URL} = require('../../config/defaults');

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const addRecipe = async (req, res) => {
    
  const { _id } = req.user;
  const recipe = req.body
  const { ingredients } = req.body;
    
  const nerArr = ingredients.map(obj => ({ ingredient: obj.ingredient,  qty: obj.qty, imgURL:`${BASE_INGREDIENT_IMG_URL}/${obj.ingredient}-Small.png` }));

  const conditions = nerArr.map(obj => ({
    $elemMatch: obj
  }))
  
  const result = await Recipe.find({ ingredients: { $all: conditions } });

    if (result.length > 0) {
        throw HttpError(409, "Recipe is already created")
    }
    await Recipe.create({ ...recipe, owner: _id, ingredients: nerArr} );
    res.status(201).send('Recipe created successfully');
};

module.exports = addRecipe;
