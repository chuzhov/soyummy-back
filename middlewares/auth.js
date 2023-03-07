const jwt = require("jsonwebtoken");

const { User } = require("../models");
const {
  HttpError,
} = require("../routes/errors/HttpErrors");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers; // = "" if headers doesn't contain authorization
  const [bearer, token] =
    authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (
      !user ||
      !user.token ||
      user.token !== token
    ) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user; // writting user data to req to send it futher
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = auth;
