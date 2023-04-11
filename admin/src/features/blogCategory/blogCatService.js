import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogCats = async () => {
  const { data } = await axios.get(
    `${base_url}/blog-category/get-all-category`
  );
  return data;
};
const createBlogCat = async (title) => {
  const { data } = await axios.post(
    `${base_url}/blog-category/create`,
    { title },
    config
  );
  return data;
};
const updateBlogCat = async (title, id) => {
  const { data } = await axios.put(
    `${base_url}/blog-category/update-category/${id}`,
    { title: title },
    config
  );
  return data;
};
const getABlogCat = async (id) => {
  const { data } = await axios.get(
    `${base_url}/blog-category/get-category/${id}`
  );
  return data;
};
const deleteBlogCat = async (id) => {
  const { data } = await axios.delete(
    `${base_url}/blog-category/delete-category/${id}`,
    config
  );
  return data;
};
const blogCatService = {
  getBlogCats,
  createBlogCat,
  updateBlogCat,
  getABlogCat,
  deleteBlogCat,
};
export default blogCatService;
