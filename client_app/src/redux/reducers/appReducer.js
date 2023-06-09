import { appConstans } from "../constants";

const initState = {
  loading: false,
  prodCategories: [],
  brands: [],
  error: "",
  cartFlag: false,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case appConstans.GET_ALL_BRAND_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case appConstans.GET_ALL_PROD_CATEGORIES_SUCCESS: {
      let stateCoppy = {
        ...state,
        prodCategories: action.payload,
        loading: false,
      };
      return stateCoppy;
    }
    case appConstans.GET_ALL_PROD_CATEGORIES_FAILURE: {
      const { errMessage } = action.payload;
      let stateCoppy = {
        ...state,
        loading: false,
        error: errMessage,
      };
      return stateCoppy;
    }
    case appConstans.GET_CART: {
      let stateCoppy = {
        ...state,
      };
      stateCoppy.cartFlag = !state.cartFlag;
      return stateCoppy;
    }
    case appConstans.GET_ALL_BRAND_REQUEST: {
      let stateCoppy = {
        ...state,
        loading: true,
      };
      return stateCoppy;
    }
    case appConstans.GET_ALL_BRAND_SUCCESS: {
      let stateCoppy = {
        ...state,
        brands: action.payload,
        loading: false,
      };
      return stateCoppy;
    }
    case appConstans.GET_ALL_BRAND_FAILURE: {
      const { errMessage } = action.payload;
      let stateCoppy = {
        ...state,
        loading: false,
        error: errMessage,
      };
      return stateCoppy;
    }

    default:
      break;
  }
  return state;
};

export default appReducer;
