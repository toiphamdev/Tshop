import React, { useState } from "react";
import { FaListUl, FaRegEdit, FaUserCircle } from "react-icons/fa";
import { MdRoom } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import "./userdashboard.css";

const UserDashboard = () => {
  const crumbArr = () => {
    const outputArr = [
      { title: "Trang chủ", path: "/" },
      { title: "Tài khoản của tôi", path: null },
    ];

    return outputArr;
  };
  const user = useSelector((state) => state.auth.user);
  return (
    <div style={{ backgroundColor: "#f8f8f8" }} className="px-3">
      <BreadCrumb cumbArr={crumbArr()} />
      <div className="py-5">
        <div className="row">
          <div className="sidebar__wrapper col-12 col-md-6 col-lg-4">
            <div className="user__info d-flex align-items-center justify-content-center">
              <FaUserCircle color="#939ca3" size={64} />
              <div className="ps-2 d-flex flex-column">
                <h4>{`${user.firstname} ${user.lastname}`}</h4>
                <p>{user.mobile}</p>
                <Link to={"/user"} className="btn__secondary">
                  <FaRegEdit size={18} />
                  <span>Chỉnh sửa</span>
                </Link>
              </div>
            </div>
            <ul className="sidebar__list">
              <li>
                <Link to={"/user/order"}>
                  <span className="sidebar__icon">
                    <FaListUl size={18} />
                  </span>
                  <span>Đơn hàng của tôi</span>
                </Link>
              </li>
              <li>
                <Link to={"/user/address"}>
                  <span className="sidebar__icon">
                    <MdRoom size={18} />
                  </span>
                  <span>Địa chỉ giao hàng</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar__content col-12 col-md-6 col-lg-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
