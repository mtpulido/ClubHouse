const multer = require("multer");
const sharp = require("sharp");


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
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

  req.file.filename = `user-${res.locals.authorizedUser._id}.jpeg`

  sharp(req.file.buffer)
    .resize(100, 100, { fit: "inside" })
    .toFormat("jpeg")
    .jpeg({ quality: 85 })
    .toFile(`./client/public/uploads/users/${req.file.filename}`)
  
  next()
};

const resizeGroupPhoto = (req, res, next) => {
  if (!req.file) return next();
  if (!req.params.id) {
    req.file.filename = `group-${res.locals.authorizedUser._id}-${Date.now()}.jpeg`
  } else {
    req.file.filename = `group-${req.params.id}.jpeg`
  }

  sharp(req.file.buffer)
    .resize(100, 100, { fit: "inside" })
    .toFormat("jpeg")
    .jpeg({ quality: 85 })
    .toFile(`./client/public/uploads/groups/${req.file.filename}`)
  
  next()
};

module.exports = {
  uploadPhoto,
  resizeUserPhoto,
  resizeGroupPhoto
}