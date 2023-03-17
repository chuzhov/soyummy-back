const { HttpError } = require('../../routes/errors/HttpErrors');
const { randomizeArray } = require('../../helpers/randomizeArray');
const { fetchRecipesByCategory } = require('../../services');

const getRecipesByLimit = async (req, res, next) => {
  const { category } = req.params;

  const data = await fetchRecipesByCategory(category);

  const limit = Number(req.params.limit);
  let meals;

  if (limit === 4 || limit === 12) {
    const randArr = randomizeArray(data.meals.length, limit);
    if (randArr.length === limit) {
      meals = [];

      for (const num of randArr) {
        meals.push(data.meals[num]);
      }
    } else {
      meals = data.meals.slice(0, limit);
    }

    res.json({ meals });
  } else {
    throw HttpError(400);
  }
};

module.exports = getRecipesByLimit;
