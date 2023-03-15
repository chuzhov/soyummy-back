const express = require("express");
const { valid } = require( "joi" );

const {
  users: ctrl,
} = require("../../controllers/");

const {
  validateBody,
  auth,
  authLogout,
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

router.post("/logout", authLogout, ctrl.logoutUser);

router.patch('/user-data', 
  auth, 
  upload.uploadCloudAvatar, 
  validateBody(schema.updateUser),
  ctrl.updateUser
);

module.exports = router;
