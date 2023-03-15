const { User } = require("../../models");

const updateUser = async (req, res) => {
    const { _id } = req.user;
    
    const avatarURL = req?.file?.path ?? null;

    const updateObj = { name: req.body?.name };
    if (req?.file?.path) {
      updateObj.avatarURL = req?.file?.path;
    }
    
    const user = await User.findByIdAndUpdate(_id, updateObj, { new: true });

    res.json({
      accessToken: user.accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
        achievements: user.achievements,
      },
    });
}

module.exports = updateUser;
