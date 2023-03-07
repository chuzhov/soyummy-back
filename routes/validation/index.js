const addUserSchema = require("./addUser.schema");
const loginUserSchema = require("./loginUser.schema");

const isInTheArray = require("./isInTheArray");

module.exports = {
  addUser: addUserSchema,
  loginUser: loginUserSchema,

  isInTheArray,
};
