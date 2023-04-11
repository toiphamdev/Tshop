import React, { useState } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DashboardOutlined,
  BellFilled,
} from "@ant-design/icons";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlinePicLeft, AiOutlinePicRight } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { FaBloggerB, FaClipboardList } from "react-icons/fa";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <div>
            <span className="lg-logo">Tshop</span>
            <span className="sm-logo">T</span>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "sign-out") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <DashboardOutlined className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <UserOutlined className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Catalogs",
              icon: <ShoppingCartOutlined className="fs-4" />,
              label: "Catalogs",
              children: [
                {
                  key: "add-product",
                  icon: <ShoppingCartOutlined className="fs-4" />,
                  label: "Add product",
                },
                {
                  key: "product-list",
                  icon: <ShoppingCartOutlined className="fs-4" />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand",
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category",
                },
                {
                  key: "category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquires",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between align-items-center ps-3 pe-3"
          style={{ padding: 0, background: colorBgContainer }}
        >
          {React.createElement(
            collapsed ? AiOutlinePicRight : AiOutlinePicLeft,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-3 align-items-center">
            <div className="potision-relative">
              <BellFilled />
              <span className="position-absolute badge bg-warning rouded-circle p-1">
                3
              </span>
            </div>
            <img
              style={{ width: "40px", height: "40px" }}
              src="https://th.bing.com/th/id/OIP.8KbP8CzOc0p7Mts63a-LlAHaH7?pid=ImgDet&rs=1"
              alt=""
            />
            <div className="d-flex justify-content-center flex-column">
              <h5 className="text-dark">Toi</h5>
              <p>phamtoiasi79@gmail.com</p>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default MainLayout;
