const axios = require('axios');

const { cacheWrapper, myCache } = require('./cacheWrapper');
const HttpError = require('../routes/errors/HttpErrors');

const instance = axios.create({
  baseURL: 'https://themealdb.com/api/json/v1/1',
});

const fetchRecipeById = async idMeal => {
  const { data } = await instance.get(`/lookup.php?i=${idMeal}`);
  if (!data.meal) {
    throw HttpError(400, `Recipe by id: ${idMeal} not found.`);
  }
  return data;
};

const fetchIngredientsList = async () => {
  const { data } = await instance.get(`/list.php?i=list`);
  if (!data) {
    throw HttpError(500, 'Ingredients list not found');
  }
  myCache.set('ingredientsList', data);
  return data;
};

const fetchRecipesByIngredient = async ingredient => {
  const { data } = await instance.get(`/filter.php?i=${ingredient}`);
  if (!data.meals) {
    throw HttpError(404, `Recipes with ingredient: ${ingredient} not found.`);
  }
  return data;
};

const fetchCategoriesList = async () => {
  const { data } = await instance.get('/list.php?c=list');
  if (!data.meals) {
    throw HttpError(500, 'Categories list not found.');
  }
  myCache.set('categoriesList', data);
  return data;
};

const fetchRecipesByCategory = async category => {
  const { data } = await instance.get(`/filter.php?c=${category}`);
  if (!data.meals) {
    throw HttpError(404, `Recipes by category: ${category} not found.`);
  }
  return data;
};

const fetchRecipesByName = async keyWord => {
  const { data } = await instance.get(`search.php?s=${keyWord}`);
  if (!data.meals) {
    throw HttpError(404, `Recipes by name: ${keyWord} not found.`);
  }
  return data;
};

module.exports = {
  instance,
  fetchRecipeById,
  fetchIngredientsList: cacheWrapper('ingredientsList', fetchIngredientsList),
  fetchRecipesByIngredient,
  fetchCategoriesList: cacheWrapper('categoriesList', fetchCategoriesList),
  fetchRecipesByCategory,
  fetchRecipesByName,
};
