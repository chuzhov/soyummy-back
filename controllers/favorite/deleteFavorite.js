const { PopularMeals } = require('../../models/popularMeals');
const { User } = require('../../models/users');
const { HttpError } = require('../../routes/errors/HttpErrors');

const deleteFavorite = async (req, res) => {
  const { idMeal } = req.params;
  const userId = req.user._id;

  const popularMeal = await PopularMeals.findOne({
    idMeal,
    users: userId,
  });

  if (!popularMeal) {
    throw HttpError(404, `The meal with ${idMeal} was not found in favorites`);
  }
  await User.updateOne(
    { _id: userId },
    { $pull: { favoriteMeals: { mealId: popularMeal._id } } }
  );

  if (popularMeal.users.length === 1) {
    await PopularMeals.deleteOne({
      idMeal,
      users: userId,
    });
  } else {
    await PopularMeals.findOneAndUpdate(
      { idMeal, users: userId },
      { $pull: { users: userId } }
    );
  }
  res.json({
    id: idMeal,
  });
};

module.exports = deleteFavorite;
