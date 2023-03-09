const addRecipe = require('./addRecipe')
const ctrlWrapper = require("../ctrlWrapper");


module.exports = {
  addRecipe: ctrlWrapper(addRecipe),
};
