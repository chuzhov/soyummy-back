const { Schema, model } = require('mongoose');

const USER_AVATAR_PARAMS = {
  dimensions: {
    width: 103,
    height: 103,
  },
  maxFileSize: 100000,
  acceptableFileTypes: ['jpg', 'jpeg', 'png'],
};

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatarURL: {
      type: String,
      required: false,
      default: '',
    },
    accessToken: String,
    achievements: {
      type: [String],
      required: false,
      default: [],
    },
    subscribed: {
      type: Boolean,
      required: false,
      default: false,
    },
    subscriptionToken: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

const User = model('user', userSchema);

module.exports = {
  User,
  USER_AVATAR_PARAMS,
};
