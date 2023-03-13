const router = require('express').Router();
const { auth, validateBody } = require('../../middlewares');
const { getList, addToList, deleteFromList } = require('../../controllers/shopingList/shopingList');
const {
  addToShopingListSchema,
  deleteFromShopingListSchema,
} = require('../validation/shopingListSchemas');

router.get('/', auth, getList);

router.post('/', auth, validateBody(addToShopingListSchema), addToList);

router.delete('/', auth, validateBody(deleteFromShopingListSchema), deleteFromList);

module.exports = router;
