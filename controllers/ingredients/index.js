const fetchAll = require("./fetchAll");
const fetchMealByIngredient = require('./fetchMealByIngredient')
const ctrlWrapper = require("../ctrlWrapper");


module.exports = {
  fetchAll: ctrlWrapper(fetchAll),
  fetchMealByIngredient: ctrlWrapper(fetchMealByIngredient),
};
