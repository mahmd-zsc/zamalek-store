let multer = require("multer");
let path = require("path");
let imageStorage = multer.diskStorage({
  destination: (req, fill, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, fill, cb) => {
    if (fill) {
      cb(
        null,
        new Date().toISOString().split(":").join("-") + fill.originalname
      );
    } else {
      cb(null, false);
    }
  },
});

module.exports.imageUpload = multer({
  storage: imageStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported fill formate" }, false);
    }
  },
  //   limits: { fileSize: 1024 * 1024 },
});
