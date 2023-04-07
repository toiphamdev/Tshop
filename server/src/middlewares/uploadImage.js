const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

function resizeAndUploadImages(req, res, next) {
  // Kiểm tra xem request có chứa file ảnh không
  if (!req.files) return next();

  const imageBuffers = [];

  // Resize ảnh và lưu vào buffer
  const resizeImage = (file) => {
    const inputPath = file.path;

    return sharp(inputPath).resize(500, 500).toBuffer();
  };

  // Lưu các buffer vào mảng
  Promise.all(req.files.map(resizeImage))
    .then((buffers) => {
      imageBuffers.push(...buffers);

      // Upload nhiều ảnh lên Cloudinary
      cloudinary.uploader
        .upload_stream_multiple({ folder: "uploads" }, (err, result) => {
          if (err) return next(err);

          // Cập nhật lại req.files với thông tin của các ảnh đã được upload lên Cloudinary
          req.files = result.map((r) => {
            return {
              filename: r.public_id,
              path: r.secure_url,
            };
          });

          next();
        })
        .end(imageBuffers);
    })
    .catch((err) => next(err));
}

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
      fs.unlinkSync(`public/images/blogs/${file.filename}`);
    })
  );
  next();
};
module.exports = { uploadPhoto, resizeAndUploadImages, blogImgResize };
