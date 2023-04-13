import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBrands = async () => {
  const { data } = await axios.get(`${base_url}/brand/get-all-brand`);
  return data;
};
const createBrand = async (title) => {
  const { data } = await axios.post(
    `${base_url}/brand/create`,
    { title },
    config
  );
  return data;
};
const updateBrand = async (title, id) => {
  const { data } = await axios.put(
    `${base_url}/brand/update-brand/${id}`,
    { title: title },
    config
  );
  return data;
};
const getABrand = async (id) => {
  const { data } = await axios.get(`${base_url}/brand/get-brand/${id}`);
  return data;
};
const deleteBrand = async (id) => {
  const { data } = await axios.delete(
    `${base_url}/brand/delete-brand/${id}`,
    config
  );
  return data;
};
const brandService = {
  createBrand,
  updateBrand,
  getABrand,
  getBrands,
  deleteBrand,
};
export default brandService;
