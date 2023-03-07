const jwt = require("jsonwebtoken");

const setToken = (
  payload,
  SECRET_KEY,
  expiresIn
) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn,
  });
};

module.exports = setToken;
