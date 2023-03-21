const { randomizeArray } = require('../../helpers/randomizeArray');
const { fetchRecipesByCategory } = require('../../services');

const getSetOfRecipes = async (req, res, next) => {
  const MAIN_CATEGORIES = ['Breakfast', 'Miscellaneous', 'Vegan', 'Dessert'];
  const MEALS_PER_CATEGORY = 4;

  const mealsByCategory = {};
  let responseArray = [];

  for (const category of MAIN_CATEGORIES) {
    const { meals } = await fetchRecipesByCategory(category);
    if (meals) {
      const randomMealsIndexes = randomizeArray(
        meals.length,
        Math.min(MEALS_PER_CATEGORY, meals.length)
      );
      for (let index = 0; index < MEALS_PER_CATEGORY; index++) {
        responseArray.push(meals[randomMealsIndexes[index]]);
      }
    } else {
      responseArray[category] = [];
    }
    mealsByCategory[category] = responseArray;
    responseArray = [];
  }
  res.json({
    mainCtegories: mealsByCategory,
  });
};

module.exports = getSetOfRecipes;
