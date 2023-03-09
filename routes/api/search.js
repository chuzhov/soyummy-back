const router = require('express').Router();
const auth = require('../../middlewares/auth');
const { search } = require('../../controllers/search/search');

router.get('/:keyWord', auth, search);

module.exports = router;
