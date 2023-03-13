const { User } = require("../../models/");
const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const getUserData = async (req, res) => {
  const { id } = req.user;
  const { uid } = req.params;

  if (id !== uid){
    throw HttpError(404)
  }
  
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