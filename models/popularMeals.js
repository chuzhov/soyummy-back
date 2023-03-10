const { Schema, model } = require('mongoose');

const popularSchema = Schema(
  {
    idMeal: {
      type: String,
      required: true,
    },
    strMeal: {
      type: String,
      required: true,
    },
    strInstructions: {
      type: String,
      required: true,
    },
    strMealThumb: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false }
);

const PopularMeals = model('popularMeal', popularSchema);

module.exports = { PopularMeals };
