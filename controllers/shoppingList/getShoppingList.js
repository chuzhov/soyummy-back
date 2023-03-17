const { ShoppingList } = require('../../models/shoppingList');
const { HttpError } = require('../../routes/errors/HttpErrors');

const getShoppingList = async (req, res, next) => {
  const shoppingList = await ShoppingList.find(
    { userId: req.user._id },
    '-userId'
  );

  res.json(shoppingList);
};

module.exports = getShoppingList;
