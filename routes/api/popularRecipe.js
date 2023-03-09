const router = require('express').Router();
const auth = require('../../middlewares/auth');
const { popular } = require('../../controllers/popular/popular');

router.get('/', popular);

module.exports = router;
