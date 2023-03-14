const { instance, setPaginationSlice } = require('../../helpers');
const ctrl = require('../ctrlWrapper');
const { HttpError } = require('../../routes/errors/HttpErrors');
const { PopularMeals } = require('../../models/popularMeals');
const { randomizeArray } = require('../../helpers/randomizeArray');

const { popularRecipesLimit, BASE_INGREDIENT_IMG_URL } = require('../../config/defaults');

const categoryList = async (req, res, next) => {
  const { data } = await instance.get('/list.php?c=list');

  const flatData = data.meals.map(el => el.strCategory);

  res.json({ meals: flatData });
};

const categoryMeals = async (req, res, next) => {
  const { data } = await instance.get(`/filter.php?c=${req.params.categoryName}`);

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
  let meals;

  if ((limit === 4 || limit === 12) && data.meals) {
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

const categoryId = async (req, res, next) => {
  const { data } = await instance.get(`/lookup.php?i=${req.params.id}`);

  const fullData = data.meals;

  if (fullData) {
    for (let ingridient = 1; ingridient < 21; ingridient++) {
      if (!fullData[0][`strIngredient${ingridient}`]) break;

      fullData[0][`strIngredientImg${ingridient}`] =
        BASE_INGREDIENT_IMG_URL +
        fullData[0][`strIngredient${ingridient}`] +
        '.png';
    }

    res.json(fullData[0]);
  } else {
    throw HttpError(404);
  }
};

const search = async (req, res, next) => {
  const {
    data: { meals },
  } = await instance.get(`search.php?s=${req.params.keyWord}`);
  //if (!meals) throw HttpError(400);
  if ( meals.length === 0 ) return res.json( { totalHits: 0, meals: [] } );

  const { page = 1, per_page = meals.length } = req.query;
  const pagination = setPaginationSlice(page, per_page, meals.length);
  if (!pagination) {
    throw HttpError(400, `Incorrect pagination params`);
  }

  res.send({
    totalHits: meals.length,
    meals: meals.slice(pagination.start, pagination.end),
  });
};

const popular = async (req, res, next) => {
  const data = await PopularMeals.find({}, '-_id -users')
    .sort({ users: 1 })
    .limit(popularRecipesLimit);

  res.json({ meals: data });
};

module.exports = {
  categoryList: ctrl(categoryList),
  categoryMeals: ctrl(categoryMeals),
  categoryLimit: ctrl(categoryLimit),
  categoryId: ctrl(categoryId),
  search: ctrl(search),
  popular: ctrl(popular),
};
