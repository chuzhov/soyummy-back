const { User } = require("../../models/");

const logoutUser = async (req, res) => {
  const { id } = req.user;
  
  await User.findByIdAndUpdate({_id: id }, {
    accessToken: "",
  });
  
  res.json({"status": "logged out"});
};

module.exports = logoutUser;
