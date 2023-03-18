const { Schema, model } = require('mongoose');

const shoppingListSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    strIngredient: {
      type: String,
      require: true,
    },
    weight: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    recipeId: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

const ShoppingList = model('shoppingList', shoppingListSchema);

module.exports = { ShoppingList };
