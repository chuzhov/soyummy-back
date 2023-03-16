const { Recipe } = require('../../models');
const { setPaginationSlice } = require('../../helpers');

const fetchRecipesByOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, per_page = 4 } = req.query;
  const meals = await Recipe.find({ owner }, '-owner, -__v ');

  const pagination = setPaginationSlice(page, per_page, meals.length);
  if (!pagination) {
    throw HttpError(400, `Incorrect pagination params`);
  }

  res.json({
    totalHits: meals.length,
    meals: meals,
  });
};

module.exports = fetchRecipesByOwner;
