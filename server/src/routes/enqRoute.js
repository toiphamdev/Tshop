const express = require("express");
const {
  createEnquiry,
  getAllEnquiry,
  updateEnquiry,
  deleteEnquiry,
} = require("../controllers/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/create", createEnquiry);

router.put("/update-enq/:id", authMiddleware, isAdmin, updateEnquiry);

router.delete("/delete-enq/:id", authMiddleware, isAdmin, deleteEnquiry);

router.get("/get-all-enq", getAllEnquiry);

module.exports = router;
