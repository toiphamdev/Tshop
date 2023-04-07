import { default as axios } from "../helpers/axios";
export const loginService = async (data) => {
  try {
    const res = await axios.post(`/user/login`, data);
    return res;
  } catch (error) {
    return error.response;
  }
};
export const resfreshTokenService = async () => {
  try {
    const res = await axios.put("/user/refresh");
    return res;
  } catch (error) {
    return error.response;
  }
};
export const forgotPasswordTokenService = async (email) => {
  try {
    const res = await axios.post("/user/forgot-password-token", { email });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const resetPasswordService = async (token, password) => {
  try {
    const res = await axios.put(`/user/reset-password/${token}`, { password });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getUserInfoSevice = async () => {
  try {
    const res = await axios.get("/user/get-a-user");
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateAddressService = async (address) => {
  try {
    const res = await axios.put("/user/save-address", { address });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const updateUserService = async (data) => {
  try {
    const res = await axios.put("/user/update-a-user", data);
    return res;
  } catch (error) {
    return error.response;
  }
};
export const updatePasswordService = async (password) => {
  try {
    const res = await axios.put("/user/update-password", { password });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const createCartService = async (cart) => {
  try {
    const res = await axios.post("/user/cart", { cart: cart });
    return res;
  } catch (error) {
    return error.response;
  }
};
export const getUserCartService = async () => {
  try {
    const res = await axios.get("/user/get-user-cart");
    return res;
  } catch (error) {
    return error.response;
  }
};

export const appyCouponService = async (coupon) => {
  try {
    const res = await axios.post("/user/cart/apply-coupon", { coupon });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const createOrderService = async (COD, couponApplied) => {
  try {
    const res = await axios.post("/user/create-order", {
      COD: COD,
      couponApplied: couponApplied,
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const emptyCartService = async () => {
  try {
    const res = await axios.post("/user/empty-cart");
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getOrderByUserSevicce = async () => {
  try {
    const res = await axios.get("/user/get-orders");
    return res;
  } catch (error) {
    return error.response;
  }
};
