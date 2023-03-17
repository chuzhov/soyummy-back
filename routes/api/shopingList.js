const router = require('express').Router();
const { auth, validateBody } = require('../../middlewares');
const { shopingList: ctrl } = require('../../controllers');
const { addToShopingListSchema } = require('../validation/shopingListSchemas');

router.get('/', auth, ctrl.getShopingList);

router.post(
  '/',
  auth,
  validateBody(addToShopingListSchema),
  ctrl.addToShopingList
);

router.delete('/:id', auth, ctrl.deleteFromShopingList);

module.exports = router;
