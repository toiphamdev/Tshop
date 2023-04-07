import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGifts, FaHeadset, FaTruck, FaWallet } from "react-icons/fa";
import "./home.css";
import TabBanner from "../../components/TabBanner/TabBanner";

const Home = () => {
  return (
    <div className="home__wrapper">
      <div className="row banner p-5 align-items-center">
        <div className="col col-12 col-lg-6">
          <div className="main__banner position-relative">
            <img
              className="img-fluid"
              alt=""
              src="https://altasoftware.vn/wp-content/uploads/sites/3/2020/11/25464-min-1536x878.jpg"
            />
            <div className="main__banner-content position-absolute">
              <h5>Tuần lễ laptop</h5>
              <p>Chỉ từ 5 triệu đồng</p>
              <Link className="btn__primary" to="/">
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
        <div className="col col-12 col-lg-6 d-flex flex-wrap">
          <div className="col-12 col-sm-6 col-md-6 col-lg-6  small__banner p-3 position-relative">
            <img
              className="img-fluid rounded"
              alt=""
              src="https://altasoftware.vn/wp-content/uploads/sites/3/2020/11/25464-min-1536x878.jpg"
            />
            <div className="small__banner-content position-absolute">
              <h5>Tuần lễ laptop</h5>
              <p>Chỉ từ 5 triệu đồng</p>
              <Link className="btn__primary" to="/">
                Mua ngay
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 small__banner p-3 position-relative">
            <img
              className="img-fluid rounded"
              alt=""
              src="https://altasoftware.vn/wp-content/uploads/sites/3/2020/11/25464-min-1536x878.jpg"
            />
            <div className="small__banner-content position-absolute">
              <h5>Tuần lễ laptop</h5>
              <p>Chỉ từ 5 triệu đồng</p>
              <Link className="btn__primary" to="/">
                Mua ngay
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6  small__banner p-3 position-relative">
            <img
              className="img-fluid rounded"
              alt=""
              src="https://altasoftware.vn/wp-content/uploads/sites/3/2020/11/25464-min-1536x878.jpg"
            />
            <div className="small__banner-content position-absolute">
              <h5>Tuần lễ laptop</h5>
              <p>Chỉ từ 5 triệu đồng</p>
              <Link className="btn__primary" to="/">
                Mua ngay
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 small__banner p-3 position-relative">
            <img
              className="img-fluid rounded"
              alt=""
              src="https://altasoftware.vn/wp-content/uploads/sites/3/2020/11/25464-min-1536x878.jpg"
            />
            <div className="small__banner-content position-absolute">
              <h5>Tuần lễ laptop</h5>
              <p>Chỉ từ 5 triệu đồng</p>
              <Link className="btn__primary" to="/">
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="home__content">
        <div className="d-flex flex-wrap">
          <div className="col-12   tab__container">
            <TabBanner
              query={"sort=-discount&discount[gt]=1"}
              title={"Khuyến mãi hot"}
            />
          </div>
          <div className="col-12  tab__container">
            <TabBanner
              query={"type=may-tinh&sort=-sold"}
              hasDigitalItem={true}
              title={"Máy tính nổi bật"}
            />
          </div>
          <div className="col-12  tab__container">
            <TabBanner
              hasDigitalItem={true}
              query={"type=dien-thoai&sort=-sold"}
              title={"Điện thoại nổi bật"}
            />
          </div>
          <div className="col-12  tab__container">
            <TabBanner
              hasDigitalItem={true}
              query={"type=may-tinh-bang&sort=-sold"}
              title={"Máy tính bảng nổi bật"}
            />
          </div>
        </div>
        <div className="service d-flex flex-wrap">
          <div className="service__item d-flex jutify-content-center col col-12 col-md-6 col-lg-3">
            <FaTruck size="40px" />
            <div className="service__item-content">
              <h6>Miễn phí giao hàng</h6>
              <p>Cho hóa đơn hơn 2 triệu</p>
            </div>
          </div>
          <div className="service__item d-flex col col-12 col-md-6 col-lg-3">
            <FaGifts size="40px" />
            <div className="service__item-content">
              <h6>Ưu đãi hằng ngày</h6>
              <p>Giảm giá, mã giảm giá</p>
            </div>
          </div>
          <div className="service__item d-flex col col-12 col-md-6 col-lg-3">
            <FaHeadset size="40px" />
            <div className="service__item-content">
              <h6>Hỗ trợ 24/7</h6>
              <p>Mua sắm với chuyên gia</p>
            </div>
          </div>
          <div className="service__item d-flex col col-12 col-md-6 col-lg-3">
            <FaWallet size="40px" />
            <div className="service__item-content">
              <h6>Thanh toán an toàn</h6>
              <p>Thanh toán được bảo vệ 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
