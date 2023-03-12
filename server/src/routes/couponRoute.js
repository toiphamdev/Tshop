const express = require("express");
const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/counponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/create", authMiddleware, isAdmin, createCoupon);

router.put("/update-coupon/:id", authMiddleware, isAdmin, updateCoupon);

router.delete("/delete-coupon/:id", authMiddleware, isAdmin, deleteCoupon);

router.get("/get-all-coupon", getAllCoupon);

module.exports = router;
