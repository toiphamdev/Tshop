import {
  getAllBrandService,
  getAllProdCategoryService,
} from "../../services/appService";
import { appConstans } from "../constants";

export const getAllProdCategory = () => {
  return async (dispatch) => {
    dispatch({ type: appConstans.GET_ALL_PROD_CATEGORIES_REQUEST });
    try {
      const res = await getAllProdCategoryService();
      if (res && res.status === 200) {
        dispatch({
          type: appConstans.GET_ALL_PROD_CATEGORIES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: appConstans.GET_ALL_PROD_CATEGORIES_FAILURE,
          payload: { ...res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllBrands = () => {
  return async (dispatch) => {
    dispatch({ type: appConstans.GET_ALL_BRAND_REQUEST });
    try {
      const res = await getAllBrandService();
      if (res && res.status === 200) {
        dispatch({
          type: appConstans.GET_ALL_BRAND_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: appConstans.GET_ALL_BRAND_FAILURE,
          payload: { ...res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
