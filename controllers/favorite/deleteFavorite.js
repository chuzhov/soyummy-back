const { PopularMeals } = require('../../models/popularMeals');
const { HttpError } = require('../../routes/errors/HttpErrors');

const deleteFavorite = async (req, res) => {
  const { idMeal } = req.params;
  const id = req.user._id;

  const data = await PopularMeals.findOne({
    idMeal,
    users: id,
  });

  if (!data) {
    throw HttpError(404, `The meal with ${idMeal} was not found in favorites`);
  }
  if (data.users.length === 1) {
    await PopularMeals.deleteOne({
      idMeal,
      users: id,
    });
  } else {
    await PopularMeals.findOneAndUpdate(
      { idMeal, users: id },
      { $pull: { users: id } }
    );
  }
  res.json({
    id: idMeal,
  });
};

module.exports = deleteFavorite;
