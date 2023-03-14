const { ShopingList } = require('../../models/shopingList');
const { HttpError } = require('../../routes/errors/HttpErrors');
const ctrl = require('../ctrlWrapper');

const getList = async (req, res, next) => {
  const shopingList = await ShopingList.find({ userId: req.user._id }, '-_id -userId');

  if (shopingList) {
    res.json({ shopingList });
  } else {
    throw HttpError(404, 'List not found');
  }
};

const addToList = async (req, res, next) => {
  const { strIngredient, weight, image, idIngredient } = req.body;

  await ShopingList.create({ userId: req.user._id, strIngredient, weight, image, idIngredient });

  res.status(201).json({ message: 'Added to  list' });
};

const deleteFromList = async (req, res, next) => {
  const data = await ShopingList.findOneAndDelete({
    userId: req.user._id,
    strIngredient: req.params.ingridientName,
  });
  if (data) {
    res.send({ id: data.idIngredient });
  } else {
    throw HttpError(400);
  }
};

module.exports = {
  getList: ctrl(getList),
  addToList: ctrl(addToList),
  deleteFromList: ctrl(deleteFromList),
};
