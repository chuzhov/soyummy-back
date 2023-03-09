const axios = require('axios');
const ctrl = require('../ctrlWrapper');
const { HttpError } = require('../../routes/errors/HttpErrors');
const { popularMeals } = require('../../models/popularMeals');

const instance = axios.create({ baseURL: 'http://www.themealdb.com/api/json/v1/1' });

const categoryList = async (req, res, next) => {
  const { data } = await instance.get('/list.php?c=list');

  const flatData = data.meals.flatMap(el => el.strCategory);

  res.json({ meals: flatData });
};

const categoryMeals = async (req, res, next) => {
  const { data } = await instance.get(`/filter.php?c=${req.body.category}`);

  const meals = data.meals;

  if (meals) {
    res.json({ meals });
  } else {
    throw HttpError(400);
  }
};

const categoryLimit = async (req, res, next) => {
  const { data } = await instance.get(`/filter.php?c=${req.params.category}`);

  const limit = Number(req.params.limit);

  if ((limit === 4 || limit === 12) && data.meals) {
    const meals = data.meals.slice(0, limit);
    res.json({ meals });
  } else {
    throw HttpError(400);
  }
};

const categoryId = async (req, res, next) => {
  const { data } = await instance.get(`/lookup.php?i=${req.params.id}`);

  const fullData = data.meals;

  if (fullData) {
    const { idMeal, strMeal, strInstructions, strMealThumb } = fullData[0];

    const isPopular = await popularMeals.findOneAndUpdate(
      { idMeal: req.params.id },
      { $inc: { requestCount: 1 } }
    );

    if (!isPopular) {
      await popularMeals.create({ idMeal, strMeal, strInstructions, strMealThumb });
    }
    res.json({ ...fullData[0] });
  } else {
    throw HttpError(404);
  }
};

module.exports = {
  categoryList: ctrl(categoryList),
  categoryMeals: ctrl(categoryMeals),
  categoryLimit: ctrl(categoryLimit),
  categoryId: ctrl(categoryId),
};
