const { setPaginationSlice } = require('../../helpers');
const { HttpError } = require('../../routes/errors/HttpErrors');
const { fetchRecipesByName } = require('../../services');

const getRecipesByName = async (req, res, next) => {
  const { keyWord } = req.params;

  const { meals } = await fetchRecipesByName(keyWord);

  if (meals.length === 0) {
    return res.json({ totalHits: 0, meals: [] });
  }

  const { page = 1, per_page = meals.length } = req.query;
  const pagination = setPaginationSlice(page, per_page, meals.length);

  res.send({
    totalHits: meals.length,
    meals: pagination ? meals.slice(pagination.start, pagination.end) : [],
  });
};

module.exports = getRecipesByName;
