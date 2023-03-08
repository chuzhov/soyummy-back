const express = require("express");

const {
  validateBody,
  auth,
} = require("../../middlewares");

const {
  recipes: ctrl,
} = require("../../controllers/");

const  schema = require("../validation/");

const router = express.Router();

router.post('/', validateBody(schema.addRecipeSchema), auth, ctrl.addRecipe);

module.exports = router;