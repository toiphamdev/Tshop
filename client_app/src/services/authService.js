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
