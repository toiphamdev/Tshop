import { default as axios } from "../helpers/axios";
const loginService = async (data) => {
  try {
    const res = await axios.post(`/user/login`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { loginService };
