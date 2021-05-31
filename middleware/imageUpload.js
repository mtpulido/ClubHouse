const multer = require("multer");
const sharp = require("sharp");


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file)
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("incorrect file"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadPhoto = upload.single("avatar");

const resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${res.locals.user._id}-${Date.now()}.jpeg`

  sharp(req.file.buffer)
    .resize(300, 300, { fit: "inside" })
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toFile(`./client/public/uploads/users/${req.file.filename}`)
  
  next()
};

const resizeGroupPhoto = (req, res, next) => {
  console.log("test test ")
  if (!req.file) return next();
  console.log("test test test")
  req.file.filename = `group-${res.locals.authorizedUser._id}-${Date.now()}.jpeg`

  sharp(req.file.buffer)
    .resize(300, 300, { fit: "inside" })
    .toFormat("jpeg")
    .jpeg({ quality: 85 })
    .toFile(`./client/public/uploads/groups/${req.file.filename}`)
  
  console.log("test in middleware")
  next()
};

module.exports = {
  uploadPhoto,
  resizeUserPhoto,
  resizeGroupPhoto
  
}