const express = require("express");

const {
  users: ctrl,
} = require("../../controllers/");

const {
  validateBody,
  auth,
} = require("../../middlewares");

const schema = require("../validation/");

const router = express.Router();

router.post(
  "/signup",
  validateBody(schema.addUser),
  ctrl.addUser
);

router.post(
  "/login",
  validateBody(schema.loginUser),
  ctrl.loginUser
);

router.post("/logout", auth, ctrl.logoutUser);

module.exports = router;
