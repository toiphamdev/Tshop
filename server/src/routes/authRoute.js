const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getUser,
  deleteaUser,
  updateaUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/cart", authMiddleware, userCart);
router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.post("/create-order", authMiddleware, createOrder);

router.get("/all-users", getAllUser);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/get-a-user", authMiddleware, isAdmin, getUser);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/get-user-cart", authMiddleware, getUserCart);

router.delete("/delete-a-user/:id", authMiddleware, deleteaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);

router.put("/update-a-user", authMiddleware, updateaUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/refresh", handleRefreshToken);
router.put("/update-password", authMiddleware, updatePassword);
router.put("/reset-password/:token", resetPassword);
router.put("/save-address", authMiddleware, saveAddress);
router.put(
  "/order/update-order-status/:id",
  authMiddleware,
  isAdmin,
  updateOrderStatus
);

module.exports = router;
