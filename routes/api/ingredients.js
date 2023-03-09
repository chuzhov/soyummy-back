const express = require("express");

const {
  auth,
  validateBody
} = require("../../middlewares");

const {
  ingredients: ctrl,
} = require("../../controllers/");

const  schema = require("../validation/");

const router = express.Router();

router.get('/list', auth, ctrl.fetchAll);

router.get('/', auth, validateBody(schema.getMealsByIngredien), ctrl.fetchMealByIngredient);

module.exports = router;