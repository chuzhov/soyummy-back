const router = require('express').Router();
const auth = require('../../middlewares/auth');
const { favorite: ctrl } = require('../../controllers');

router.get('/', auth, ctrl.getFavorites);

router.post('/', auth, ctrl.addFavorite);

router.delete('/:idMeal', auth, ctrl.deleteFavorite);

module.exports = router;
