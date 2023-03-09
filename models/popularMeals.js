const { Schema, model } = require('mongoose');

const popularSchema = Schema(
  {
    mealId: {
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
