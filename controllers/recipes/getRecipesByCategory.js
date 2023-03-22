const { fetchRecipesByCategory } = require('../../services');

const getRecipesByCategory = async (req, res) => {
  const { categoryName } = req.params;

  const { meals } = await fetchRecipesByCategory(categoryName);

  res.json({ meals });
};

module.exports = getRecipesByCategory;
