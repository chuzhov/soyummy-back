const instance = require('./instance');
const { BASE_INGREDIENT_IMG_URL } = require('../config/defaults');

async function getRecipeIngredients(recipe) {
  const ingredientsNames = [];
  const ingredientsValues = [];
  const allIngredients = await instance.get('/list.php?i=list');

  for (const value of Object.entries(recipe)) {
    if (value[0].includes('strIngredient') && value[1]) {
      ingredientsNames.push(value[1]);
    }
    if (value[0].includes('strMeasure') && value[1]) {
      ingredientsValues.push(value[1]);
    }
  }

  return ingredientsNames.reduce((acc, ingredientName, index) => {
    const ingredientInfo = allIngredients.data.meals.find(
      item => item.strIngredient.toLowerCase() === ingredientName.toLowerCase()
    );

    return [
      ...acc,
      {
        ingredient: ingredientName,
        qty: ingredientsValues[index],
        imgURL: `${BASE_INGREDIENT_IMG_URL}${ingredientName.replace(' ', '%20')}-Small.png`,
        description: ingredientInfo.strDescription,
        id: ingredientInfo.idIngredient,
      },
    ];
  }, []);
}

module.exports = getRecipeIngredients;
