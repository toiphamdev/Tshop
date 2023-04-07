import { createCartService } from "../../services/authService";
import { cartConstants } from "../constants";

export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
    try {
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { ...product, count: 1 },
      });
    } catch (error) {
      dispatch({
        type: cartConstants.ADD_TO_CART_FAILURE,
      });
      console.log(error);
    }
  };
};

export const createCart = (cart) => {
  return async (dispatch) => {
    try {
      const res = await createCartService(cart);
      if (res && res.status === 200) {
        dispatch({ type: cartConstants.CREATE_CART });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
