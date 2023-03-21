const { randomizeArray } = require('../../helpers/randomizeArray');
const { fetchRecipesByCategory } = require('../../services');

const getSetOfRecipes = async (req, res, next) => {
  const MAIN_CATEGORIES = ['Breakfast', 'Miscellaneous', 'Vegan', 'Dessert'];
  const MEALS_PER_CATEGORY = 4;

  const mealsByCategory = {};
  const responseArray = [];

  for (const category of MAIN_CATEGORIES) {
    const { meals } = await fetchRecipesByCategory(category);
    if (meals) {
      const randomMealsIndexes = randomizeArray(
        meals.length,
        MEALS_PER_CATEGORY
      );
      for (let randomIndex of randomMealsIndexes) {
        responseArray.push(meals[randomIndex]);
      }
    } else {
      responseArray[category] = [];
    }
    mealsByCategory[category] = responseArray;
  }
  res.json({
    mainCtegories: mealsByCategory,
  });
};

module.exports = getSetOfRecipes;
