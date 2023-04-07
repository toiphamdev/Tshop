import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getOrders = async () => {
  const { data } = await axios.get(`${base_url}/user/get-all-order`);
  return data;
};

const orderService = {
  getOrders,
};

export default orderService;
