const express = require("express");

const {
  users: ctrl,
} = require("../../controllers/");

const {
  validateBody,
  auth,
  upload
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

router.get("/user-data/:uid", auth, ctrl.getUserData);

router.post("/logout", auth, ctrl.logoutUser);

router.patch('/avatar', auth, upload.uploadCloudAvatar, ctrl.updateAvatar)

module.exports = router;
