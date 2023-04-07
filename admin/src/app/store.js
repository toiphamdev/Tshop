import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import blogReducer from "../features/blog/blogSlice";
import blogCatReducer from "../features/blogCategory/blogCatSlice";
import enqReducer from "../features/enquiry/enqSlice";
import orderReducer from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    category: categoryReducer,
    blog: blogReducer,
    blogCategory: blogCatReducer,
    enq: enqReducer,
    order: orderReducer,
  },
});
