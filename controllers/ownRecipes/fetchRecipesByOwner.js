const { Recipe } = require('../../models');
const { setPaginationSlice } = require('../../helpers');

const fetchRecipesByOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, per_page = 4 } = req.query;
  const meals = await Recipe.find({ owner }, '-owner, -__v ').sort({
    _id: 'descending',
  });

  const pagination = setPaginationSlice(page, per_page, meals.length);

  res.json({
    totalHits: meals.length,
    meals: pagination ? meals.slice(pagination.start, pagination.end) : [],
  });
};

module.exports = fetchRecipesByOwner;
