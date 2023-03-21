const express = require('express');

const { users: ctrl } = require('../../controllers/');

const {
  validateBody,
  auth,
  authLogout,
  checkEmailToken,
  upload,
} = require('../../middlewares');

const schema = require('../validation/');

const router = express.Router();

router.post('/signup', validateBody(schema.addUser), ctrl.addUser);

router.post('/login', validateBody(schema.loginUser), ctrl.loginUser);

router.get('/user-data', auth, ctrl.getUserData);

router.post(
  '/user-data/subscribe',
  auth,
  validateBody(schema.subscribeUser),
  ctrl.sendSubscriptionEmail
);

router.get('/user-data/subscribe', checkEmailToken, ctrl.addSubscription);

router.post('/logout', authLogout, ctrl.logoutUser);

router.patch(
  '/user-data',
  auth,
  upload.uploadCloudAvatar,
  validateBody(schema.updateUser),
  ctrl.updateUser
);

module.exports = router;
