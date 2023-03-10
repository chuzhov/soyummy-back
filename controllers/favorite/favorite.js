const ctrl = require('../ctrlWrapper');
const instance = require('../../helpers/instance');
const { popularMeals } = require('../../models/popularMeals');
const { HttpError } = require('../../routes/errors/HttpErrors');

const getFavorites = async (req, res, next) => {
  const { _id } = req.user;

  const data = await popularMeals.find({ users: _id });

  res.json({ data });
};

const addFavorite = async (req, res, next) => {
  const { data } = await instance.get(`/lookup.php?i=${req.body.idMeal}`);

  const fullData = data.meals;

  if (fullData) {
    const { _id } = req.user;
    const { idMeal, strMeal, strInstructions, strMealThumb } = fullData[0];

    const isPopular = await popularMeals.findOneAndUpdate(
      { idMeal: req.body.idMeal },
      { $addToSet: { users: _id } }
    );

    if (!isPopular) {
      await popularMeals.create({
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
  const data = await popularMeals.findOne({ idMeal: req.body.idMeal, users: req.user._id });

  if (data) {
    if (data.users.length === 1) {
      await popularMeals.deleteOne({ idMeal: req.body.idMeal, users: req.user._id });
    } else {
      await popularMeals.findOneAndUpdate(
        { idMeal: req.body.idMeal, users: req.user._id },
        { $pull: { users: req.user._id } }
      );
    }
    res.status(204).send();
  } else {
    throw HttpError(400);
  }
};

module.exports = {
  getFavorites: ctrl(getFavorites),
  addFavorite: ctrl(addFavorite),
  deleteFavorite: ctrl(deleteFavorite),
};
