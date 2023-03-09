const { Schema, model } = require('mongoose');

const popularSchema = Schema(
  {
    idMeal: {
      type: String,
      require: true,
    },
    strMeal: {
      type: String,
      require: true,
    },
    strInstructions: {
      type: String,
      require: true,
    },
    strMealThumb: {
      type: String,
      require: true,
    },
    requestCount: {
      type: Number,
      default: 1,
      require: true,
    },
  },
  { versionKey: false }
);

const popularMeals = model('popularMeal', popularSchema);

module.exports = { popularMeals };
