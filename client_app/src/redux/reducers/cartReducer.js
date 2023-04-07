import { cartConstants } from "../constants";

const initialState = {
  products: {},
  loading: false,
  flag: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST: {
      let stateCoppy = { ...state };
      return stateCoppy;
    }
    case cartConstants.ADD_TO_CART_SUCCESS: {
      let stateCoppy = { ...state };
      if (stateCoppy.products[action.payload._id]) {
        stateCoppy.products[action.payload._id].count++;
      } else {
        stateCoppy.products[action.payload._id] = action.payload;
      }
      localStorage.setItem("products", JSON.stringify(stateCoppy.products));
      return stateCoppy;
    }
    case cartConstants.RESET_CART: {
      let stateCoppy = { ...state };
      let products = localStorage.getItem("products");
      stateCoppy.products = JSON.parse(products);
      return stateCoppy;
    }
    case cartConstants.PLUS_PRODUCT_CART: {
      let stateCoppy = { ...state };
      if (stateCoppy.products[action.payload._id]) {
        stateCoppy.products[action.payload._id].count++;
      }
      localStorage.setItem("products", JSON.stringify(stateCoppy.products));
      return stateCoppy;
    }
    case cartConstants.SUBTRACT_PRODUCT_CART: {
      let stateCoppy = { ...state };
      if (stateCoppy.products[action.payload._id]) {
        if (stateCoppy.products[action.payload._id].count === 1) {
          delete stateCoppy.products[action.payload._id];
        } else {
          stateCoppy.products[action.payload._id].count--;
        }
      }
      localStorage.setItem("products", JSON.stringify(stateCoppy.products));
      return stateCoppy;
    }
    case cartConstants.CREATE_CART: {
      let stateCoppy = { ...state };
      // stateCoppy.flag = !state.flag;
      return stateCoppy;
    }
    case cartConstants.EMPTY_CART: {
      let stateCoppy = { ...state };
      stateCoppy.products = {};
      localStorage.removeItem("products");
      return stateCoppy;
    }
    default:
      break;
  }
  return state;
};

export default cartReducer;
