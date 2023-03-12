const express = require("express");
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
} = require("../controllers/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
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
  productImgResize,
  uploadProductImages
);

router.get("/get-a-product/:id", getaProduct);
router.get("/get-all-product", getAllProduct);

router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);
router.delete(
  "/delete-product-image/:id",
  authMiddleware,
  isAdmin,
  deleteProductImage
);

module.exports = router;
