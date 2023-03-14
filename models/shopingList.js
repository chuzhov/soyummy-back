const { Schema, model } = require('mongoose');

const shopingListSchema = Schema(
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
    idIngredient: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

const ShopingList = model('shopingList', shopingListSchema);

module.exports = { ShopingList };
