const { fetchRecipesByCategory } = require('../../services');
const { shuffleArray } = require('../../helpers');

const getRecipesByLimit = async (req, res, next) => {
  const { category } = req.params;

  const { meals } = await fetchRecipesByCategory(category);
  const shuffledMeals = meals.length > 2 ? shuffleArray(meals) : meals;

  const limit = Number(req.params.limit);

  res.json({ meals: shuffledMeals.slice(0, Math.min(meals.length, limit)) });
};

module.exports = getRecipesByLimit;
