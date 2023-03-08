const axios = require('axios');
const ctrl = require('../ctrlWrapper');
const { HttpError } = require('../../routes/errors/HttpErrors');

const instance = axios.create({ baseURL: 'http://www.themealdb.com/api/json/v1/1' });

const categoryList = async (req, res, next) => {
  const { data } = await instance.get('/list.php?c=list');

  res.json({ ...data });
};

const categoryMeals = async (req, res, next) => {
  const { data } = await instance.get(`/filter.php?c=${req.body.category}`);

  res.json({ ...data });
};

const categoryLimit = async (req, res, next) => {
  const { data } = await instance.get(`/filter.php?c=${req.params.category}`);

  const limit = Number(req.params.limit);

  if (limit === 4 || limit === 12) {
    const meals = data.meals.slice(0, limit);
    res.json({ meals });
  } else {
    throw HttpError(400);
  }
};

const categoryId = async (req, res, next) => {
  const { data } = await instance.get(`/lookup.php?i=${req.params.id}`);

  const fullData = data.meals;

  if (fullData) res.json({ ...fullData[0] });

  throw HttpError(404);
};

module.exports = {
  categoryList: ctrl(categoryList),
  categoryMeals: ctrl(categoryMeals),
  categoryLimit: ctrl(categoryLimit),
  categoryId: ctrl(categoryId),
};
