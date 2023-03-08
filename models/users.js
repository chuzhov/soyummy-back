const { Schema, model } = require("mongoose");

const USER_AVATAR_PARAMS = {
  dimensions: {
    width: 250,
    height: 250,
  },
  maxFileSize: 100000,
  acceptableFileTypes: [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
  ],
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
    },
    acessToken: String,
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  User,
  USER_AVATAR_PARAMS,
};
