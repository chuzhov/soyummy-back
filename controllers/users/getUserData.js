const { User } = require("../../models/");

const getUserData = async (req, res) => {
  const { id } = req.user;
  
  const user = await User
    .findOne({_id: id })
    .select("_id name email avatarURL accessToken achievements");
    res.json({
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        achievements: user.achievements,
      },
    });
};

module.exports = getUserData;