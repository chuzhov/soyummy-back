const express = require("express");

const {
  validateBody,
  auth,
  upload
} = require("../../middlewares");

const {
  recipes: ctrl,
} = require("../../controllers/");

const schema = require("../validation/");

const router = express.Router();

router.post('/', auth, upload.uploadCloudRecipe, validateBody(schema.addRecipeSchema), ctrl.addRecipe);

router.get('/', auth, ctrl.fetchRecipesByOwner);

router.delete('/:id', auth, ctrl.delRecipe);

module.exports = router;