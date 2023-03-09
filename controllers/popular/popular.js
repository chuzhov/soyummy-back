const ctrl = require('../ctrlWrapper');
const { popularMeals } = require('../../models/popularMeals');

const popular = async (req, res, next) => {
  const data = await popularMeals.find({}, '-_id -requestCount').sort({ requestCount: -1 });

  const limitCount = 10;

  const limitedData = data.slice(0, limitCount);

  res.json({ meals: limitedData });
};

module.exports = { popular: ctrl(popular) };
