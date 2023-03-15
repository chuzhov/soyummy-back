const { User } = require("../../models/");

const logoutUser = async (req, res) => {

  const { id } = req.user;
  if (id) {
    await User.findByIdAndUpdate(
      {_id: id }, 
      { accessToken: "", }
    );
  } else {
    const { accessToken } = req.accessToken;
    if ( accessToken ) {
      User.findOneAndUpdate(
        { accessToken }, 
        { $set: { accessToken: "" } }
      );
    }
  }
  
  res.json({"status": "logged out"});
};

module.exports = logoutUser;
