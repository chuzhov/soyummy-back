const { ShoppingList } = require('../../models/shoppingList');
const { HttpError } = require('../../routes/errors/HttpErrors');

const getShoppingList = async (req, res, next) => {
  const shoppingList = await ShoppingList.find(
    { userId: req.user._id },
    '-userId'
  );

  if (shoppingList) {
    res.json({ shoppingList });
  } else {
    throw HttpError(404, 'List not found');
  }
};

module.exports = getShoppingList;
