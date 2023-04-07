import { getAllProdCategoryService } from "../../services/appService";
import { appConstans } from "../constants";

export const getAllProdCategory = () => {
  return async (dispatch) => {
    dispatch({ type: appConstans.GET_ALL_PROD_CATEGORIES_REQUEST });
    try {
      const res = await getAllProdCategoryService();
      if (res && res.status === 200) {
        dispatch({
          type: appConstans.GET_ALL_PROD_CATEGORIES_SUCCESS,
          payload: res.data.category,
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
