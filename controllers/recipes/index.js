const addRecipe = require('./addRecipe');
const fetchRecipesByOwner = require('./fetchRecipesByOwner');
const getOwnRecipeByID = require('./getOwnRecipeByID')
const ctrlWrapper = require("../ctrlWrapper");
const delRecipe = require('./delRecipe');


module.exports = {
  addRecipe: ctrlWrapper(addRecipe),
  fetchRecipesByOwner: ctrlWrapper(fetchRecipesByOwner),
  delRecipe: ctrlWrapper(delRecipe),
  getOwnRecipeByID: ctrlWrapper(getOwnRecipeByID)
};
