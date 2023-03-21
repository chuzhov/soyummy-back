const { Schema, model } = require('mongoose');

const USER_RECIPE_PIC_PARAMS = {
  dimensions: {
    width: 280,
    height: 270,
  },
  maxFileSize: 1000000,
  acceptableFileTypes: ['jpg', 'jpeg', 'png'],
};

const ingredientSchema = Schema({
  ingredient: {
    type: String,
    require: true,
  },
  qty: {
    type: String,
    require: true,
  },
  imgURL: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  id: {
    type: String,
  },
  _id: false,
});

const recipeSchema = Schema({
  imgURL: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: String,
    required: true,
  },
  ingredients: [ingredientSchema],
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

const Recipe = model('Recipe', recipeSchema);

module.exports = {
  Recipe,
  USER_RECIPE_PIC_PARAMS,
};
