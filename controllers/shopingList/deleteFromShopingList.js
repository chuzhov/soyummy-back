const { ShopingList } = require('../../models/shopingList');
const { HttpError } = require('../../routes/errors/HttpErrors');

const deleteFromShopingList = async (req, res, next) => {
  const data = await ShopingList.findByIdAndDelete(req.params.id);
  if (data) {
    res.send({ id: data._id });
  } else {
    throw HttpError(400);
  }
};

module.exports = deleteFromShopingList;
