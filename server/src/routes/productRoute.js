const express = require("express");
const paginate = require("express-paginate");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWhistList,
  ratingProduct,
  uploadProductImages,
  deleteProductImage,
  getRatingComment,
} = require("../controllers/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  uploadPhoto,
  resizeAndUploadImages,
} = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/create-product", authMiddleware, isAdmin, createProduct);

router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.put("/add-to-wishlist", authMiddleware, addToWhistList);
router.put("/rating-product", authMiddleware, ratingProduct);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  uploadProductImages
);

router.get("/get-a-product/:slug", getaProduct);
router.get("/get-all-product", paginate.middleware(10, 50), getAllProduct);
router.get("/get-rating-comment/:id", getRatingComment);

router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);
router.delete(
  "/delete-product-image/:id",
  authMiddleware,
  isAdmin,
  deleteProductImage
);

module.exports = router;
