const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({ _id: decoded?.id });
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(501).json({
        errMessage: "Not authorization token expired. Pleases login again.",
      });
    }
  } else {
    res
      .status(501)
      .json({ errMessage: "This isn't token attached to headers" });
  }
});
//Check admin role
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email: email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
