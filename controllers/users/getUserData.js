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
  
  const dbAnswer = await User.findOne({_id: id }).select("_id name email avatarURL favoriteRecipes");
  res.json(dbAnswer);
};

module.exports = getUserData;