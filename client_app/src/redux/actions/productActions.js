import {
  getAllProductService,
  getProductDetailsService,
} from "../../services/productService";
import { productConstants } from "../constants";

export const getDetailsProduct = (slug) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_BY_SLUG_REQUEST });
    try {
      const res = await getProductDetailsService(slug);
      if (res && res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
