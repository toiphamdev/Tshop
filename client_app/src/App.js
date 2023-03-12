import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Contact from "./Container/Contact/Contact";
import Home from "./Container/Home/Home";
import ProductDetail from "./Container/ProductDetail/ProductDetail";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Container/Login/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authConstants } from "./redux/constants";

function App() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth && auth.token) {
      dispatch({ type: authConstants.LOGIN_SUCCESS, payload: { ...auth } });
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/:product" element={<ProductDetail />} />
          <Route path="/:product/:brand" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
