const router = require('express').Router();
const {
  categoryList,
  categoryMeals,
  categoryLimit,
  categoryId,
} = require('../../controllers/pages/recipes');

router.get('/category/list', categoryList);

router.get('/category', categoryMeals);

router.get('/:category/:limit', categoryLimit);

router.get('/:id', categoryId);

module.exports = router;
