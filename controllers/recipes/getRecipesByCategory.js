const { fetchRecipesByCategory } = require('../../services');

const getRecipesByCategory = async (req, res) => {
  const { categoryName } = req.params;

  const data = await fetchRecipesByCategory(categoryName);
  const meals = data.meals;

  res.json({ meals });
};

module.exports = getRecipesByCategory;
