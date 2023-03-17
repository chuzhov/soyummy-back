const { ShoppingList } = require('../../models/shoppingList');
const { HttpError } = require('../../routes/errors/HttpErrors');

const deleteFromShoppingList = async (req, res, next) => {
  const data = await ShoppingList.findByIdAndDelete(req.params.id);
  if (data) {
    res.send({ id: data._id });
  } else {
    throw HttpError(400);
  }
};

module.exports = deleteFromShoppingList;
