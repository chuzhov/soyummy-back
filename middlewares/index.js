const validateBody = require('./validateBody');
const auth = require('./auth');
const authLogout = require('./authLogout');
const checkEmailToken = require('./checkEmailToken');
const upload = require('./uploadCloud');

module.exports = {
  validateBody,
  auth,
  authLogout,
  checkEmailToken,
  upload,
};
