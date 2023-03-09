const ctrl = require('../ctrlWrapper');
const { popularMeals } = require('../../models/popularMeals');

const popular = async (req, res, next) => {
  const data = await popularMeals.find({}, '-_id -requestCount').sort({ requestCount: -1 });

  res.json({ meals: data });
};

module.exports = { popular: ctrl(popular) };
