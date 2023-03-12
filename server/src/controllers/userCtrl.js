const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
//create new user
const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //Create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //User already exists.
    throw new Error("User already exists.");
  }
});
//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user is exist or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      email: findUser?._email,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//login user
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check user is exist or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin && findAdmin.role !== "admin")
    throw new Error("Not Authorization");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = generateToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin?._id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      email: findAdmin?._email,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    res.status(502).json({ errMessage: "No Refresh Token in Cookies" });
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res
      .status(502)
      .json({ errMessage: "No Refresh token present in db or not matched" });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      res
        .status(502)
        .json({ errMessage: "There is something wrong with refresh token" });
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//logout user
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

//update a user
const updateaUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id },
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        email: req.body?.email,
        mobile: req.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json({
      updatedUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Get all users
const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
//Get a single user
const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    if (_id) {
      const getaUser = await User.findById({ _id });
      res.json({
        getaUser,
      });
    } else {
      throw new Error("Missing required parameter.");
    }
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a user
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id });
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//handle block user
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      errMessage: "User is blocked.",
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      errMessage: "User is unblocked.",
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});
// genarate token and send email to reset password
const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found with this email.");
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Click vào link dưới đây để lấy lại mật khẩu của bạn.Link này sẽ đóng sau 10 phút. <a href='${process.env.API}/api/user/reset-password/${token}'>Click here</a>`;
    const data = {
      to: email,
      subject: "Lấy lại mật khẩu",
      html: resetURL,
      text: "Chào bạn",
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//reset password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//get wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findById(_id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    throw new Error(error);
  }
});

//save user address
const saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;
  validateMongoDbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      address,
    });
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});
//handle user cart
const userCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await User.findById(_id);
    const alreadyCart = await Cart.findOne({ orderby: user._id });
    if (alreadyCart) {
      alreadyCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.findOne({ orderby: _id }).populate(
      "products.product"
    );
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findById(_id);
    const cart = await Cart.findOneAndRemove({ orderby: user._id });

    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      throw new Error("Invalid Coupon");
    }
    const user = await User.findById(_id);
    let { products, cartTotal } = await Cart.findOne({
      orderby: user._id,
    });
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderby: user._id },
      {
        totalAfterDiscount,
      }
    );
    res.json(totalAfterDiscount);
  } catch (error) {
    throw new Error(error);
  }
});

//create new order
const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  if (!COD) {
    throw new Error("Create order failed");
  }
  try {
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderby: user._id });
    let finalAmout = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmout = userCart.totalAfterDiscount;
    } else {
      finalAmout = userCart.cartTotal;
    }
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmout,
        status: "Cash on Delivery",
        create: Date.now(),
        currency: "VND",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({ errMessage: "Success" });
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const userOrders = await Order.find({ orderby: _id })
      .populate("products.product")
      .exec();
    res.json(userOrders);
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: { status: status },
      },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  userCart,
  updateOrderStatus,
  createUser,
  forgotPasswordToken,
  loginUser,
  getAllUser,
  applyCoupon,
  getUser,
  deleteaUser,
  getOrders,
  getWishlist,
  updateaUser,
  blockUser,
  unblockUser,
  emptyCart,
  handleRefreshToken,
  logout,
  updatePassword,
  resetPassword,
  loginAdmin,
  saveAddress,
  getUserCart,
  createOrder,
};
