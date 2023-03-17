const { ShopingList } = require('../../models/shopingList');

const addToShopingList = async (req, res, next) => {
  const { strIngredient, weight, image } = req.body;

  await ShopingList.create({
    userId: req.user._id,
    strIngredient,
    weight,
    image,
  });

  res.status(201).json({ message: 'Added to  list' });
};

module.exports = addToShopingList;
