import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "../redux/actions/authActions";
import { authConstants } from "../redux/constants";
import store from "../redux/store";
import { resfreshTokenService } from "../services/authService";
import { api } from "../urlConfig";

//check jwt token express in
const isTokenValid = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp > Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

const token = window.localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
export const provinceInstance = axios.create({
  baseURL: "https://provinces.open-api.vn/api",
});
axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  // const validToken = isTokenValid(auth.token);
  if (auth.token && isTokenValid(auth.token)) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }

  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const { status } = error.response;
    const originalRequest = error.config;
    if (status === 501 && !originalRequest._retry) {
      originalRequest._retry = true;
      const getToken = await resfreshTokenService();
      const newToken = getToken.data.accessToken;
      if (newToken) {
        localStorage.setItem("token", newToken);
        // Thêm Authorization header mới vào yêu cầu
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        // Gửi lại yêu cầu
        return axiosInstance(originalRequest);
      } else {
        // Nếu không thể đổi mới accessToken, đưa người dùng về trang đăng nhập
        window.location.href = "/login";
        store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
