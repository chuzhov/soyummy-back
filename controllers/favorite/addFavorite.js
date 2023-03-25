const { mongoose } = require('mongoose');
const { User } = require('../../models');
const { PopularMeals } = require('../../models/popularMeals');
const { Recipe } = require('../../models/recipes');
const { fetchRecipeById } = require('../../services');
const { themealdp_API_ID_LENGTH } = require('../../config/defaults');

const addFavorite = async (req, res) => {
  const { idMeal: idRecipe } = req.body;
  const { _id } = req.user;

  let isPopular = await PopularMeals.findOneAndUpdate(
    { idMeal: idRecipe },
    { $addToSet: { users: _id } }
  );

  if (idRecipe.toString().length < themealdp_API_ID_LENGTH) {
    const { meals } = await fetchRecipeById(idRecipe);

    const { idMeal, strMeal, strInstructions, strMealThumb } = meals[0];

    if (!isPopular) {
      isPopular = await PopularMeals.create({
        idMeal,
        strMeal,
        strInstructions,
        strMealThumb,
        users: [_id],
      });
    }
  } else {
    const { title, description, imgURL } = await Recipe.findOne({
      _id: idRecipe,
      owner: _id,
    });
    if (!isPopular) {
      isPopular = await PopularMeals.create({
        idMeal: idRecipe,
        strMeal: title,
        strInstructions: description,
        strMealThumb: imgURL,
        users: [_id],
      });
    }
  }

  if (isPopular) {
    const newFavoriteRecipe = {
      mealId: mongoose.Types.ObjectId(isPopular._id),
      addedOn: new Date(),
    };

    await User.findOneAndUpdate(
      { _id },
      { $addToSet: { favoriteMeals: newFavoriteRecipe } }
    );
  }

  res.status(201).json({ message: 'Added to favorite' });
};

module.exports = addFavorite;
