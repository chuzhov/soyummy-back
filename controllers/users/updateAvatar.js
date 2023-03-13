const { User } = require("../../models");

const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    if (!req.file) {
        throw HttpError(400, "Avatar must be exist");
    }
    const avatarURL = req.file.path
    await User.findByIdAndUpdate(_id, { avatarURL });
}

module.exports = updateAvatar;
