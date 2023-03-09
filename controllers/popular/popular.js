const ctrl = require('../ctrlWrapper');
const { popularMeals } = require('../../models/popularMeals');

const popular = async (req, res, next) => {
  const limit = 10;

  const data = await popularMeals
    .find({}, '-_id -requestCount')
    .sort({ requestCount: -1 })
    .limit(limit);

  res.json({ meals: data });
};

module.exports = { popular: ctrl(popular) };
