const ctrlWrapper = require('../ctrlWrapper');
const getShopingList = require('./getShopingList');
const addToShopingList = require('./addToShopingList');
const deleteFromShopingList = require('./deleteFromShopingList');

module.exports = {
  getShopingList: ctrlWrapper(getShopingList),
  addToShopingList: ctrlWrapper(addToShopingList),
  deleteFromShopingList: ctrlWrapper(deleteFromShopingList),
};
