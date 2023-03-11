const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { nanoid } = require('nanoid');

const {HttpError } = require("../helpers");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const multerConfigAvatar = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const avatarName = `${req.user._id}_avatar.`;
    return {
      folder: "assets/avatars",
      allowed_formats: ["png", "jpeg"],
      public_id: avatarName,
      transformation: [{ height: 323, width: 300, crop: "fill" }],
    };
  },
});

const multerConfiRecipe = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const { _id } = req.user;
    // const imgID = nanoid(5);
    const RecipeName = `${_id}_recipe`;
    return {
      folder: "assets/own_recipes_photos",
      allowed_formats: ["png", "jpeg"],
      public_id: RecipeName,
      transformation: [{ height: 250, width: 250, crop: "fill" }],
    };
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      HttpError(
        400,
        "Unsupported avatar format. Choose file with extention jpeg or png"
      )
    );
  }
}

const uploadCloudAvatar = multer({
  storage: multerConfigAvatar,
  fileFilter,
});

const uploadCloudRecipe = multer({
  storage: multerConfiRecipe,
  fileFilter,
});


module.exports = {
  uploadCloudRecipe: uploadCloudRecipe.single("picture"),
  uploadCloudAvatar: uploadCloudAvatar.single("picture"),
};
