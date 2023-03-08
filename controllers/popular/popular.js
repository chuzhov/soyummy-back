const ctrl = require('../ctrlWrapper');
const { popularMeals } = require('../../models/popularMeals');

const popular = async (req, res, next) => {
  const data = await popularMeals.find({}, '-_id -requestCount').sort({ requestCount: -1 });
  //   const f = data.sort((a, b) => b.requestCount - a.requestCount);
  //   console.log(f);
  const flatData = data.flatMap(data => data.mealId);

  res.json({ data: flatData });
};

module.exports = { popular: ctrl(popular) };
