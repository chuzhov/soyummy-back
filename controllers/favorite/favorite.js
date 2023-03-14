const ctrl = require("../ctrlWrapper");
const { instance, setPaginationSlice } = require("../../helpers");
const { PopularMeals } = require("../../models/popularMeals");
const { HttpError } = require("../../routes/errors/HttpErrors");

const { FAV_MEALS_PER_PAGE } = require("../../config/defaults");

const getFavorites = async (req, res, next) => {
  const { _id } = req.user;
  // const { page = 1, limit = FAV_MEALS_PER_PAGE } = req.query;
  // const skip = req.query.page > 0 ? (req.query.page - 1) * pageLimit : 0;

  const data = await PopularMeals.find({ users: _id }, "-_id -users");
  if (data.length === 0) return res.json([]);

  const { page = 1, per_page = data.length } = req.query;
  const pagination = setPaginationSlice(page, per_page, data.length);
  if (!pagination) {
    throw HttpError(400, `Incorrect pagination params`);
  }

  res.send({
    totalHits: data.length,
    meals: data.slice(pagination.start, pagination.end),
  });
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

    res.status(201).json({ message: "Added to favorite" });
  } else {
    throw HttpError(400);
  }
};

const deleteFavorite = async (req, res, next) => {
  const data = await PopularMeals.findOne({
    idMeal: req.params.idMeal,
    users: req.user._id,
  });

  if (data) {
    if (data.users.length === 1) {
      await PopularMeals.deleteOne({
        idMeal: req.params.idMeal,
        users: req.user._id,
      });
    } else {
      await PopularMeals.findOneAndUpdate(
        { idMeal: req.params.idMeal, users: req.user._id },
        { $pull: { users: req.user._id } }
      );
    }
    res.json({
      id: req.params.idMeal,
    });
  } else {
    throw HttpError(
      404,
      `The meal with ${req.params.idMeal} was not found in favorites`
    );
  }
};

module.exports = {
  getFavorites: ctrl(getFavorites),
  addFavorite: ctrl(addFavorite),
  deleteFavorite: ctrl(deleteFavorite),
};
