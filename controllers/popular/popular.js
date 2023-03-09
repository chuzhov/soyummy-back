const ctrl = require('../ctrlWrapper');
const { popularMeals } = require('../../models/popularMeals');

const popular = async (req, res, next) => {
  const data = await popularMeals.find({}, '-_id -requestCount').sort({ requestCount: -1 });

  const limit = data.slice(0, 10);

  res.json({ meals: limit });
};

module.exports = { popular: ctrl(popular) };
