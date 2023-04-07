import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const login = async (userData) => {
  const { data } = await axios.post(`${base_url}/user/admin-login`, userData);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const authService = {
  login,
};
export default authService;
