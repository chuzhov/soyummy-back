const { setPaginationSlice } = require('../../helpers');
const { PopularMeals } = require('../../models/popularMeals');
const { HttpError } = require('../../routes/errors/HttpErrors');

const getFavorites = async (req, res) => {
  const { _id } = req.user;

  const data = await PopularMeals.find({ users: _id }, '-_id -users');
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
