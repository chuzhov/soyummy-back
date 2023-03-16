const { setPaginationSlice } = require('../../helpers');
const { fetchRecipesByIngredient } = require('../../services');

const { HttpError } = require('../../routes/errors/HttpErrors');

const fetchMealByIngredient = async (req, res) => {
  const { q } = req.params;

  const data = await fetchRecipesByIngredient(q);
  if (!data.meals) {
    throw HttpError(404, `Meal with ingredient ${q} not found`);
  }

  const { page = 1, per_page = data.meals.length } = req.query;

  const pagination = setPaginationSlice(page, per_page, data.meals.length);
  if (!pagination) {
    throw HttpError(400, 'Incorrect pagination params');
  }
  res.send({
    totalHits: data.meals.length,
    meals: data.meals.slice(pagination.start, pagination.end),
  });
};

module.exports = fetchMealByIngredient;
