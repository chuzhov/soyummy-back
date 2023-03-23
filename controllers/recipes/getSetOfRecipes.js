const { shuffleArray } = require('../../helpers');
const { fetchRecipesByCategory } = require('../../services');

const getSetOfRecipes = async (req, res, next) => {
  const MAIN_CATEGORIES = ['Breakfast', 'Miscellaneous', 'Vegan', 'Dessert'];
  const MEALS_PER_CATEGORY = 4;

  const mealsByCategory = {};
  let responseArray = [];

  for (const category of MAIN_CATEGORIES) {
    const { meals } = await fetchRecipesByCategory(category);
    if (meals) {
      const shuffledMeals = meals.length > 2 ? shuffleArray(meals) : meals;
      responseArray = shuffledMeals.slice(
        0,
        Math.min(meals.length, MEALS_PER_CATEGORY)
      );
    } else {
      responseArray = [];
    }
    mealsByCategory[category] = responseArray;
    responseArray = [];
  }
  res.json({
    mainCategories: mealsByCategory,
  });
};

module.exports = getSetOfRecipes;
