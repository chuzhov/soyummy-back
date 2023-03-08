const express = require("express");
const axios = require('axios');

const {
  ingredients: ctrl,
} = require("../../controllers/");


const schema = require("../validation/");

const router = express.Router();

router.get('/list', ctrl.fetchAll)

router.get('/', ctrl.fetchMealByIngredient)

module.exports = router;