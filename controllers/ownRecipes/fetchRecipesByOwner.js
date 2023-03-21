const { Recipe } = require('../../models');
const { setPaginationSlice } = require('../../helpers');

const fetchRecipesByOwner = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, per_page = 4 } = req.query;
  const meals = await Recipe.find({ owner }, '-owner, -__v ');

  const arrReverse = meals.reverse();

  const pagination = setPaginationSlice(page, per_page, arrReverse.length);

  res.json({
    totalHits: arrReverse.length,
    meals: pagination ? arrReverse.slice(pagination.start, pagination.end) : [],
  });
};

module.exports = fetchRecipesByOwner;
