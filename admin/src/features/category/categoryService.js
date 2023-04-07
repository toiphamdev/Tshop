import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getCategories = async () => {
  const { data } = await axios.get(
    `${base_url}/prod-category/get-all-category`
  );
  return data;
};

const categoryService = {
  getCategories,
};

export default categoryService;
