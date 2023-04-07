import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const { data } = await axios.get(`${base_url}/product/get-all-product`);
  return data;
};

const productService = {
  getProducts,
};
export default productService;
