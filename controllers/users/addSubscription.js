const { User } = require('../../models/index');

const addSubscription = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscribed: true },
    {
      returnDocument: 'after',
      select: '-password -subscriptionToken',
    }
  );
  res.json({
    accessToken: user.accessToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      subscribed: user.subscribed,
      achievements: user.achievements,
    },
  });
};

module.exports = addSubscription;
