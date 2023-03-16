const { fetchCategoriesList } = require('../../services');

const getCategories = async (req, res) => {
  const data = await fetchCategoriesList();

  const flatData = data.meals.map(el => el.strCategory);

  res.json({ meals: flatData });
};

module.exports = getCategories;
