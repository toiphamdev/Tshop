import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getBlogs = async () => {
  const { data } = await axios.get(`${base_url}/blog/get-all-blog`);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

const blogService = {
  getBlogs,
};
export default blogService;
