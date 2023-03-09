const instance = require('../../helpers/instance')

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const fetchMealByIngredient = async (req, res) => {
    const { ingredient } = req.body;
    const {data} = await instance.get(`/filter.php?i=${ingredient}`)
    console.log(data.meals)
    if (!data.meals) {
        throw HttpError(404, `Meal by ingredient ${ingredient} not found`);
    }
    
    res.send(data.meals);

module.exports = fetchMealByIngredient;
