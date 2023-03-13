const router = require('express').Router();
const auth = require('../../middlewares/auth');
const {
  getFavorites,
  addFavorite,
  deleteFavorite,
} = require('../../controllers/favorite/favorite');

router.get('/', auth, getFavorites);

router.post('/', auth, addFavorite);

router.delete('/:idMeal', auth, deleteFavorite);

module.exports = router;
