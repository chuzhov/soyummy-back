const router = require('express').Router();
const { auth, validateBody } = require('../../middlewares');
const { shoppingList: ctrl } = require('../../controllers');
const {
  addToShoppingListSchema,
} = require('../validation/shoppingListSchemas');

router.get('/', auth, ctrl.getShoppingList);

router.post(
  '/',
  auth,
  validateBody(addToShoppingListSchema),
  ctrl.addToShoppingList
);

router.delete('/:id', auth, ctrl.deleteFromShoppingList);

module.exports = router;
