const ctrlWrapper = require('../ctrlWrapper');
const getCategories = require('./getCategories');
const getRecipesByCategory = require('./getRecipesByCategory');
const getRecipesByLimit = require('./getRecipesByLimit');
const getRecipeById = require('./getRecipeById');
const getRecipesByName = require('./getRecipesByName');
const getPopularRecipes = require('./getPopularRecipes');

module.exports = {
  getCategories: ctrlWrapper(getCategories),
  getRecipesByCategory: ctrlWrapper(getRecipesByCategory),
  getRecipesByLimit: ctrlWrapper(getRecipesByLimit),
  getRecipeById: ctrlWrapper(getRecipeById),
  getRecipesByName: ctrlWrapper(getRecipesByName),
  getPopularRecipes: ctrlWrapper(getPopularRecipes),
};
