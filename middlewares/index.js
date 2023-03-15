const validateBody = require("./validateBody");
const auth = require("./auth");
const authLogout = require("./authLogout");
const upload = require('./uploadCloud');


module.exports = {
  validateBody,
  auth,
  authLogout,
  upload,
};
