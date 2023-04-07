import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Contact from "./Container/Contact/Contact";
import Home from "./Container/Home/Home";
import ProductDetail from "./Container/ProductDetail/ProductDetail";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Container/Login/Login";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appConstans, authConstants, cartConstants } from "./redux/constants";
import ForgotPassword from "./Container/ForgotPassword/ForgotPassword";
import ResetPassword from "./Container/ResetPassword/ResetPassword";
import NotFound from "./Container/NotFound/NotFound";
import ProductFilter from "./Container/ProductFilter/ProductFilter";
import CompareProduct from "./Container/CompareProduct/CompareProduct";
import UserDashboard from "./Container/UserDashboard/UserDashboard";
import Cart from "./Container/Cart/Cart";
import { createCartService } from "./services/authService";
import { convertCartToArr } from "./utils";
import EditInfo from "./Container/UserDashboard/EditInfo";
import UserOrder from "./Container/UserDashboard/UserOrder";
import UserAddress from "./Container/UserDashboard/UserAddress";

function App() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const dispatch = useDispatch();
  const products = localStorage.getItem("products");
  const cart = useSelector((state) => state.cart);
  const authenticate = useSelector((state) => state.auth.authenticate);

  useEffect(() => {
    if (auth && auth.token) {
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { ...auth } });
    }
    if (products) {
      dispatch({ type: cartConstants.RESET_CART });
    }
  }, []);
  useEffect(() => {
    const createCart = async () => {
      const res = await createCartService(convertCartToArr(cart.products));
      if (res && res.status === 200) {
        dispatch({ type: appConstans.GET_CART });
      }
    };
    if (authenticate) {
      createCart();
    }
  }, [{ ...cart.products }, authenticate]);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password/:token" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="/user" element={<UserDashboard />}>
            <Route index element={<EditInfo />} />
            <Route path="/user/order" element={<UserOrder />} />
            <Route path="/user/address" element={<UserAddress />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
          <Route path="/compare-product" element={<CompareProduct />} />
          <Route
            path="/:type/:category/:productSlug"
            element={<ProductDetail />}
          />
          <Route path="/:type/:category" element={<ProductFilter />} />
          <Route path="/:type" element={<ProductFilter />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/content/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
