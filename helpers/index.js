const setPagination = require('./setPagination');
const setPaginationSlice = require('./setPaginationSlice');
const setSort = require('./setSort');
const setToken = require('./setToken');
const sendEmail = require('./sendEmail');
const {
  instance,
  fetchCategoriesList,
  fetchIngredientsList,
  fetchRecipeById,
  fetchRecipesByCategory,
  fetchRecipesByIngredient,
  fetchRecipesByName,
} = require('./instance');
const getRecipeIngredients = require('./getRecipeIngredients');

module.exports = {
  setPagination,
  setPaginationSlice,
  setSort,
  setToken,
  sendEmail,
  getRecipeIngredients,
  instance,
  fetchCategoriesList,
  fetchIngredientsList,
  fetchRecipeById,
  fetchRecipesByCategory,
  fetchRecipesByIngredient,
  fetchRecipesByName,
};
