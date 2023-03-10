const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { ctrlWrapper, HttpError } = require("../helpers");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const multerConfig = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const extention = file.originalname.split(".").pop();
    const avatarName = `${req.user._id}_avatar.${extention}`;
    return {
      folder: "so_yammi/recipes",
      allowed_formats: ["png", "jpeg"],
      public_id: avatarName,
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

const uploadCloud = multer({
  storage: multerConfig,
  fileFilter,
});

module.exports = ctrlWrapper(uploadCloud.single("avatar"));
