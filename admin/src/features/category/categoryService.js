import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getCategories = async () => {
  const { data } = await axios.get(
    `${base_url}/prod-category/get-all-category`
  );
  return data;
};
const createCat = async (title) => {
  const { data } = await axios.post(
    `${base_url}/prod-category/create`,
    { ...title },
    config
  );
  return data;
};
const updateCat = async (title, id) => {
  console.log(title, id);
  const { data } = await axios.put(
    `${base_url}/prod-category/update-category/${id}`,
    { title },
    config
  );
  return data;
};
const getACat = async (id) => {
  const { data } = await axios.get(
    `${base_url}/prod-category/get-category/${id}`
  );
  return data;
};
const deleteCat = async (id) => {
  const { data } = await axios.delete(
    `${base_url}/prod-category/delete-category/${id}`,
    config
  );
  return data;
};
const categoryService = {
  getCategories,
  createCat,
  updateCat,
  getACat,
  deleteCat,
};
export default categoryService;
