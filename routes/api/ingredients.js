const express = require("express");
const axios = require('axios');

const {
  auth,
} = require("../../middlewares");

const {
  ingredients: ctrl,
} = require("../../controllers/");


const schema = require("../validation/");

const router = express.Router();

router.get('/list', auth, ctrl.fetchAll)

router.get('/', auth, ctrl.fetchMealByIngredient)

module.exports = router;