const { PopularMeals } = require('../../models/popularMeals');
const { fetchRecipeById } = require('../../services');

const addFavorite = async (req, res) => {
  const { idMeal: idRecipe } = req.body;
  const { _id } = req.user;
  const fullData = await fetchRecipeById(idRecipe);

  const { idMeal, strMeal, strInstructions, strMealThumb } = fullData[0];

  const isPopular = await PopularMeals.findOneAndUpdate(
    { idMeal: idRecipe },
    { $addToSet: { users: _id } }
  );

  if (!isPopular) {
    await PopularMeals.create({
      idMeal,
      strMeal,
      strInstructions,
      strMealThumb,
      users: [_id],
    });
  }

  res.status(201).json({ message: 'Added to favorite' });
};

module.exports = addFavorite;
