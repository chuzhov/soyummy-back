const { ShoppingList } = require('../../models/shoppingList');

const addToShoppingList = async (req, res, next) => {
  const { strIngredient, weight, image } = req.body;

  await ShoppingList.create({
    userId: req.user._id,
    strIngredient,
    weight,
    image,
  });

  res.status(201).json({ message: 'Added to  list' });
};

module.exports = addToShoppingList;
