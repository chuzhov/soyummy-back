const { fetchIngredientsList } = require('./instance');
const { BASE_INGREDIENT_IMG_URL } = require('../config/defaults');

async function getRecipeIngredients(recipe) {
  const ingredientsNames = [];
  const ingredientsValues = [];
  const allIngredients = await fetchIngredientsList();

  for (const value of Object.entries(recipe)) {
    if (value[0].includes('strIngredient') && value[1]) {
      ingredientsNames.push(value[1]);
    }
    if (value[0].includes('strMeasure') && value[1]) {
      ingredientsValues.push(value[1]);
    }
  }

  return ingredientsNames.reduce((acc, ingredientName, index) => {
    const ingredientInfo = allIngredients.meals.find(
      item => item.strIngredient.toLowerCase() === ingredientName.toLowerCase()
    );

    return [
      ...acc,
      {
        ingredient: ingredientName,
        qty: ingredientsValues[index],
        imgURL: `${BASE_INGREDIENT_IMG_URL}${ingredientName.replace(
          ' ',
          '%20'
        )}-Small.png`,
        description: ingredientInfo?.strDescription || null,
        id: ingredientInfo?.idIngredient || null,
      },
    ];
  }, []);
}

module.exports = getRecipeIngredients;
