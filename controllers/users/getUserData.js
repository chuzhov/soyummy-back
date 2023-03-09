const { User } = require("../../models/");

const getUserData = async (req, res) => {
  const { id } = req.user;
  
  const dbAnswer = await User.findOne({_id: id }).select("_id name email avatarURL favoriteRecipes");
  res.json(dbAnswer);
};

module.exports = getUserData;