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
      default: "",
    },
    accessToken: String,

    // customRecipes: {
    //   type: [String],
    //   required: false,
    //   default: [], // an array of _ids at customRecipes table mondoDB
    // },
    favoriteRecipes: {
      type: [String],
      required: false,
      default: [], // an array of ids at www.themealdb.com/api/json/v1/1/lookup.php?i={id}
    },
    subscribed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  { timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  User,
  USER_AVATAR_PARAMS,
};
