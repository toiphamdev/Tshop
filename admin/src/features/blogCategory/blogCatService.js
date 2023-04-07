import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { date } from "yup";

const getBlogCats = async () => {
  const { data } = await axios.get(
    `${base_url}/blog-category/get-all-category`
  );
  return data;
};

const blogCatService = {
  getBlogCats,
};
export default blogCatService;
