const { Schema, model } = require('mongoose');

const shopingListSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    listArr: {
      type: [
        {
          ingridientName: {
            type: String,
            require: true,
          },
          number: {
            type: String,
            require: true,
          },
          imgURL: {
            type: String,
            require: true,
          },
          _id: false,
        },
      ],
      required: true,
    },
  },
  { versionKey: false }
);

const ShopingList = model('shopingList', shopingListSchema);

module.exports = { ShopingList };
