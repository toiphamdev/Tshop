import { default as axios } from "../helpers/axios";

export const getProductDetailsService = async (slug) => {
  try {
    const res = await axios(`/product/get-a-product/${slug}`);
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getProductCommentService = async (id, page = 1, limit = 2) => {
  try {
    const res = await axios.get(
      `/product/get-rating-comment/${id}?page=${page}&limit=${limit}`
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const ratingProductService = async (data) => {
  try {
    const res = await axios.put("/product/rating-product", { ...data });
    return res;
  } catch (error) {
    return error.response;
  }
};

export const getAllProductService = async (query, page = null, size = null) => {
  try {
    let res = await axios.get(
      `/product/get-all-product?${query}&page=${page}&limit=${size}}`
    );
    return res;
  } catch (error) {
    return error.response;
  }
};
