const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controllers/prodCategoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createCategory);

router.get("/get-category/:id", getCategory);
router.get("/get-all-category", getAllCategory);

router.put("/update-category/:id", authMiddleware, isAdmin, updateCategory);

router.delete("/delete-category/:id", authMiddleware, isAdmin, deleteCategory);

module.exports = router;
