const { User } = require('../../models/');

const logoutUser = async (req, res) => {
  if (req.user) {
    const { id } = req.user;
    await User.findByIdAndUpdate({ _id: id }, { accessToken: '' });
  } else {
    if (req.accessToken) {
      const { accessToken } = req.accessToken;
      User.findOneAndUpdate({ accessToken }, { $set: { accessToken: '' } });
    }
  }

  res.json({ status: 'logged out' });
};

module.exports = logoutUser;
