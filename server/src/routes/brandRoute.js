const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
} = require("../controllers/brandCrtl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, isAdmin, createBrand);

router.get("/get-brand/:id", getBrand);
router.get("/get-all-brand", getAllBrand);

router.put("/update-brand/:id", authMiddleware, isAdmin, updateBrand);

router.delete("/delete-brand/:id", authMiddleware, isAdmin, deleteBrand);

module.exports = router;
