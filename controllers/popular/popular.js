const ctrl = require('../ctrlWrapper');
const { popularMeals } = require('../../models/popularMeals');

const { popularRecipesLimit } = require('../../config/defaults');

const popular = async (req, res, next) => {
  const data = await popularMeals
    .find({}, '-_id -requestCount -users')
    .sort({ users: 1 })
    .limit(popularRecipesLimit);

  res.json({ meals: data });
};

module.exports = { popular: ctrl(popular) };
