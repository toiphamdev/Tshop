const express = require("express");
const {
  createColor,
  getAllColor,
  updateColor,
  deleteColor,
} = require("../controllers/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/create", authMiddleware, isAdmin, createColor);

router.put("/update-color/:id", authMiddleware, isAdmin, updateColor);

router.delete("/delete-color/:id", authMiddleware, isAdmin, deleteColor);

router.get("/get-all-color", getAllColor);

module.exports = router;
