const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");
const { uploadImages, deleteImages } = require("../controllers/uploadCtrl");

const router = express.Router();
router.post(
  "/upload-image",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  uploadImages
);

router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
