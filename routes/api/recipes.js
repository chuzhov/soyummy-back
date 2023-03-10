const router = require('express').Router();
const auth = require('../../middlewares/auth');
const {
  categoryList,
  categoryMeals,
  categoryLimit,
  categoryId,
  search,
  popular,
} = require('../../controllers/recipes/recipes');

router.get('/category/list', auth, categoryList);

router.get('/popular', auth, popular);

router.get('/category/:categoryName', auth, categoryMeals);

router.get('/search/:keyWord', auth, search);

router.get('/:category/:limit', auth, categoryLimit);

router.get('/:id', auth, categoryId);

module.exports = router;
