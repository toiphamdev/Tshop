import { productConstants } from "../constants";

const initState = {
  productDetails: {},
  loading: false,
  error: "",
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST: {
      let stateCoppy = { ...state, loading: true };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCTS_BY_SLUG_SUCCESS: {
      let stateCoppy = {
        ...state,
        loading: false,
        productDetails: action.payload,
      };
      return stateCoppy;
    }
    case productConstants.GET_PRODUCTS_BY_SLUG_FAILURE: {
      const { errMessage } = action.payload;
      let stateCoppy = { ...state, loading: false, error: errMessage };
      return stateCoppy;
    }
    default:
      break;
  }
  return state;
};

export default productReducer;
