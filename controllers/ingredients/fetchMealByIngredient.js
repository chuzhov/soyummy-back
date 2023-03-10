const instance = require('../../helpers/instance')

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const fetchMealByIngredient = async (req, res) => {
  const { q } = req.params;
    const { data } = await instance.get(`/filter.php?i=${q}`)
    if (!data.meals) {
        throw HttpError(404, `Meal by ingredient ${ingredient} not found`);
    }
    
    res.send(data.meals);
};


module.exports = fetchMealByIngredient;
