import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./components/MainLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlogCat from "./pages/AddBlogCat";
import AddCat from "./pages/AddCat";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category" element={<AddBlogCat />} />
          <Route path="blog-category/:id" element={<AddBlogCat />} />
          <Route path="blog-category-list" element={<BlogCatList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="category" element={<AddCat />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
