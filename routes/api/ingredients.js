const express = require("express");

const {
  auth,
} = require("../../middlewares");

const {
  ingredients: ctrl,
} = require("../../controllers/");


const router = express.Router();

router.get('/list', auth, ctrl.fetchAll);

router.get('/', auth, ctrl.fetchMealByIngredient);

module.exports = router;