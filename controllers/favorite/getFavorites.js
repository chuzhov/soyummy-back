const { mongoose } = require('mongoose');
const { setPaginationSlice } = require('../../helpers');
const { User } = require('../../models/users');
const { PopularMeals } = require('../../models/popularMeals');
const { HttpError } = require('../../routes/errors/HttpErrors');

const getFavorites = async (req, res) => {
  const { _id } = req.user;

  //const data = await PopularMeals.find({ users: _id }, '-_id -users');

  const data = await User.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(_id) },
    },
    {
      $project: {
        _id: 0,
        favoriteMeals: 1,
      },
    },
    {
      $unwind: '$favoriteMeals',
    },
    {
      $lookup: {
        from: 'popularmeals',
        localField: 'favoriteMeals.mealId',
        foreignField: '_id',
        as: 'mealInfo',
      },
    },
    {
      $unwind: '$mealInfo',
    },
    {
      $project: {
        idMeal: '$mealInfo.idMeal',
        addedOn: '$favoriteMeals.addedOn',
        strMeal: '$mealInfo.strMeal',
        strInstructions: '$mealInfo.strInstructions',
        strMealThumb: '$mealInfo.strMealThumb',
      },
    },
    {
      $sort: { addedOn: -1 },
    },
  ]);

  const { page = 1, per_page = data.length } = req.query;

  if (data.length === 0) {
    return res.json({ totalHits: 0, meals: [] });
  }

  const pagination = setPaginationSlice(page, per_page, data.length);
  if (!pagination) {
    throw HttpError(400, 'Incorrect pagination params');
  }

  res.json({
    totalHits: data.length,
    meals: data.slice(pagination.start, pagination.end),
  });
};

module.exports = getFavorites;
