const { PopularMeals } = require('../../models/popularMeals');
const { popularRecipesLimit } = require('../../config/defaults');

const getPopularRecipes = async (req, res) => {
  const data = await PopularMeals.find(
    {
      idMeal: { $exists: true },
      $expr: { $lt: [{ $strLenCP: '$idMeal' }, 6] },
    },
    '-_id -users'
  )
    .sort({ users: 1 })
    .limit(popularRecipesLimit);

  res.json({ meals: data });
};

module.exports = getPopularRecipes;
