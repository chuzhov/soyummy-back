const ctrl = require('../ctrlWrapper');
const instance = require('../../helpers/instance');
const { PopularMeals } = require('../../models/popularMeals');
const { HttpError } = require('../../routes/errors/HttpErrors');
const { pageLimit } = require('../../config/defaults');

const getFavorites = async (req, res, next) => {
  const { _id } = req.user;

  const skip = req.query.page > 0 ? (req.query.page - 1) * pageLimit : 0;

  const data = await PopularMeals.find({ users: _id }, '-_id -users').skip(skip).limit(pageLimit);

  res.json({ data });
};

const addFavorite = async (req, res, next) => {
  const { data } = await instance.get(`/lookup.php?i=${req.body.idMeal}`);

  const fullData = data.meals;

  if (fullData) {
    const { _id } = req.user;
    const { idMeal, strMeal, strInstructions, strMealThumb } = fullData[0];

    const isPopular = await PopularMeals.findOneAndUpdate(
      { idMeal: req.body.idMeal },
      { $addToSet: { users: _id } }
    );

    if (!isPopular) {
      await PopularMeals.create({
        idMeal,
        strMeal,
        strInstructions,
        strMealThumb,
        users: [_id],
      });
    }

    res.status(201).json({ message: 'Added to favorite' });
  } else {
    throw HttpError(400);
  }
};

const deleteFavorite = async (req, res, next) => {
  const data = await PopularMeals.findOne({ idMeal: req.params.idMeal, users: req.user._id });

  if (data) {
    if (data.users.length === 1) {
      await PopularMeals.deleteOne({ idMeal: req.params.idMeal, users: req.user._id });
    } else {
      await PopularMeals.findOneAndUpdate(
        { idMeal: req.params.idMeal, users: req.user._id },
        { $pull: { users: req.user._id } }
      );
    }
    res.json({
      id: req.params.idMeal
    })
  } else {
    throw HttpError(404, `The meal with ${req.params.idMeal} was not found in favorites`);
  }
};

module.exports = {
  getFavorites: ctrl(getFavorites),
  addFavorite: ctrl(addFavorite),
  deleteFavorite: ctrl(deleteFavorite),
};
