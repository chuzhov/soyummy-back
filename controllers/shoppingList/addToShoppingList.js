const { ShoppingList } = require('../../models/shoppingList');

const addToShoppingList = async (req, res, next) => {
  const { strIngredient, weight, image, recipeId } = req.body;

  const { _id } = await ShoppingList.create({
    userId: req.user._id,
    strIngredient,
    weight,
    image,
    recipeId,
  });

  res.status(201).json({ _id, recipeId, strIngredient, weight, image });
};

module.exports = addToShoppingList;
