import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  product: productReducer,
  cart: cartReducer,
});

export default rootReducer;
