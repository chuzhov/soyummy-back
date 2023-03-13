const { ShopingList } = require('../../models/shopingList');
const { HttpError } = require('../../routes/errors/HttpErrors');
const ctrl = require('../ctrlWrapper');
const { getListArr } = require('../../helpers/listArr');

const getList = async (req, res, next) => {
  const updated = await ShopingList.findOne({ userId: req.user._id });

  if (updated) {
    res.json({ shopingList: updated.listArr });
  } else {
    throw HttpError(404, 'List not found');
  }
};

const addToList = async (req, res, next) => {
  const reqArr = req.body.ingridients;
  const updated = await ShopingList.findOne({ userId: req.user._id });

  const listArr = getListArr(updated, reqArr);

  if (!updated) {
    await ShopingList.create({ userId: req.user._id, listArr: [...reqArr] });
  } else {
    await ShopingList.findOneAndUpdate({ userId: req.user._id }, { listArr });
  }
  res.status(201).json({ message: 'Added to  list' });
};

const deleteFromList = async (req, res, next) => {
  const data = await ShopingList.findOne({ userId: req.user._id });
  if (data) {
    const { listArr } = data;

    const sortedArr = listArr.filter(el => el.ingridientName !== req.body.ingridientName);

    if (sortedArr.length === listArr.length) {
      throw HttpError(400, 'You do not have this ingridient in the list!');
    }

    if (sortedArr.length === 0) {
      await ShopingList.findOneAndDelete({ userId: req.user._id });
    } else {
      await ShopingList.findOneAndUpdate({ userId: req.user._id }, { listArr: sortedArr });
    }
    res.status(204).send();
  } else {
    throw HttpError(400);
  }
};

module.exports = {
  getList: ctrl(getList),
  addToList: ctrl(addToList),
  deleteFromList: ctrl(deleteFromList),
};
