import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const { data } = await axios.get(`${base_url}/user/all-users`);
  return data;
};

const customerService = {
  getUsers,
};
export default customerService;
