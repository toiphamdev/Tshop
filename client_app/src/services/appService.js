import { default as axios } from "../helpers/axios";
export const getAllProdCategoryService = async () => {
  try {
    const res = await axios.get("/prod-category/get-all-category");
    return res;
  } catch (error) {
    return error.response;
  }
};
