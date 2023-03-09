const addRecipe = require('./addRecipe');
const fetchRecipesByOwner = require('./fetchRecipesByOwner')
const ctrlWrapper = require("../ctrlWrapper");


module.exports = {
  addRecipe: ctrlWrapper(addRecipe),
  fetchRecipesByOwner: ctrlWrapper(fetchRecipesByOwner )
};
