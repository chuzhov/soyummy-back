const addUserSchema = require("./addUser.schema");
const loginUserSchema = require("./loginUser.schema");
const updateUserSchema = require("./updateUser.schema");
const addRecipeSchema = require('./addRecipe.schema');
const getMealsByIngredien = require ('./getMealsByIngredien');

const isInTheArray = require("./isInTheArray");

module.exports = {
  addUser: addUserSchema,
  loginUser: loginUserSchema,
  updateUser: updateUserSchema,
  addRecipeSchema: addRecipeSchema,
  isInTheArray,
  getMealsByIngredien,
};
