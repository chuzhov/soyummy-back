const router = require('express').Router();
const auth = require('../../middlewares/auth');
const {
  categoryList,
  categoryMeals,
  categoryLimit,
  categoryId,
} = require('../../controllers/recipes/recipes');

router.get('/category/list', auth, categoryList);

router.get('/category', auth, categoryMeals);

router.get('/:category/:limit', auth, categoryLimit);

router.get('/:id', auth, categoryId);

module.exports = router;
