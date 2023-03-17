const { ShopingList } = require('../../models/shopingList');
const { HttpError } = require('../../routes/errors/HttpErrors');

const getShopingList = async (req, res, next) => {
  const shopingList = await ShopingList.find(
    { userId: req.user._id },
    '-userId'
  );

  if (shopingList) {
    res.json({ shopingList });
  } else {
    throw HttpError(404, 'List not found');
  }
};

module.exports = getShopingList;
