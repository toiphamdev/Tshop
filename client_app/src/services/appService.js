import { default as axios } from "../helpers/axios";
export const getAllProdCategoryService = async () => {
  try {
    const res = await axios.get("/prod-category/get-all-category");
    return res;
  } catch (error) {
    return error.response;
  }
};
export const getAllBrandService = async () => {
  try {
    const res = await axios.get("/brand/get-all-brand");
    return res;
  } catch (error) {
    return error.response;
  }
};
