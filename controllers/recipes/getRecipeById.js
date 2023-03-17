const { getRecipeIngredients } = require('../../helpers/');
const { fetchRecipeById } = require('../../services');

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const data = await fetchRecipeById(id);
  const fullData = data.meals;

  const {
    strMealThumb: imgURL,
    strMeal: title,
    about = [],
    strCategory: category,
    cookingTime = '',
    strInstructions: description,
  } = fullData[0];

  const result = {
    imgURL,
    title,
    about,
    category,
    cookingTime,
    description,
    ingredients: await getRecipeIngredients(fullData[0]),
  };
  res.json(result);
};

module.exports = getRecipeById;
