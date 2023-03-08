const { User } = require("../../models/");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, {
    accessToken: "",
  });
  res.status(204);
};

module.exports = logoutUser;
