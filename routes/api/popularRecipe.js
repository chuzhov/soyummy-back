const router = require('express').Router();
const auth = require('../../middlewares/auth');
const { popular } = require('../../controllers/popular/popular');

router.get('/', auth, popular);

module.exports = router;
