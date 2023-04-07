import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import ModalConvert from "../../components/ModalConvert/ModalConvert";
import { appConstans, cartConstants } from "../../redux/constants";
import {
  appyCouponService,
  createOrderService,
  getUserCartService,
  getUserInfoSevice,
} from "../../services/authService";
import { formatPrice } from "../../utils";
import "./cart.css";

const Cart = () => {
  const crumbArr = () => {
    const outputArr = [
      { title: "Trang chủ", path: "/" },
      { title: "Giỏ hàng", path: null },
    ];

    return outputArr;
  };
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const cartFlag = useSelector((state) => state.app.cartFlag);
  const [products, setProducts] = useState({});
  const [productsServer, setProductsServer] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterCoupon, setTotalAffterCoupon] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [orderModal, setOrderModal] = useState(false);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserCart = async () => {
      const res = await getUserCartService();
      if (res && res.status === 200) {
        setCartTotal(res.data.cartTotal);
        setTotalAffterCoupon(
          res.data.totalAfterDiscount ? res.data.totalAfterDiscount : null
        );
        setProductsServer(res.data.products);
      }
    };
    if (auth.authenticate) {
      getUserCart();
    }
  }, [auth.authenticate, cartFlag]);
  useEffect(() => {
    setProducts(cart.products);
  }, [{ ...cart.products }]);
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserInfoSevice(auth.user._id);
      if (res && res.status === 200) {
        setAddress(res.data.getaUser.address ? res.data.getaUser.address : "");
      }
    };
    getUserInfo();
  }, []);
  const renderProduct = () => {
    return auth.authenticate ? (
      <div className="m-5 cart__wrapper">
        <div className="cart__title">
          <h3>Có {productsServer.length} sản phẩm trong giỏ hàng</h3>
        </div>
        <div>
          {productsServer.length > 0 &&
            productsServer.map((item, index) => {
              return (
                <div key={index} className="">
                  <div className="d-flex justify-content-around align-items-center">
                    <img
                      className="pro__img"
                      alt=""
                      src={
                        item.product.images ? item.product.images[0].url : ""
                      }
                    />
                    <h5>{item.product.title}</h5>

                    <div className="d-flex cart__product-options">
                      <span
                        onClick={() => {
                          dispatch({
                            type: cartConstants.PLUS_PRODUCT_CART,
                            payload: { _id: item.product._id },
                          });
                        }}
                      >
                        +
                      </span>
                      <input value={item.count} readOnly />
                      <span
                        onClick={() => {
                          dispatch({
                            type: cartConstants.SUBTRACT_PRODUCT_CART,
                            payload: { _id: item.product._id },
                          });
                        }}
                      >
                        -
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <del>{formatPrice(item.price * item.count)} đ</del>

                      {item.product.discount > 0 && (
                        <span className="text-danger">
                          {formatPrice(
                            (item.price -
                              (item.price * item.product.discount) / 100) *
                              item.count
                          )}{" "}
                          đ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="d-flex flex-wrap justify-content-between px-5 align-items-center border">
          <div className="d-flex" style={{ maxHeight: "40px" }}>
            <input
              className="ps-3"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder={"Nhập mã giảm giá"}
            />
            <button onClick={applyCoupon} className="btn__secondary">
              Áp dụng
            </button>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex">
              <p>Tổng tiền: </p>
              <span className="ps-3">{formatPrice(cartTotal)} đ</span>
            </div>
            {totalAfterCoupon && (
              <div className="d-flex">
                <p>Sau khi giảm giá: </p>
                <span className="ps-3">{formatPrice(totalAfterCoupon)} đ</span>
              </div>
            )}
            <div className="d-flex">
              <p>Sau khi thanh toán: </p>
              <span className="ps-3 text-danger">
                {totalAfterCoupon
                  ? formatPrice(totalAfterCoupon)
                  : formatPrice(cartTotal)}{" "}
                đ
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center flex-column py-3">
          <button onClick={prevCreateOrder} className="btn btn-danger">
            Tạo đơn đặt hàng
          </button>
        </div>
      </div>
    ) : (
      <div className="m-5 cart__wrapper">
        <div className="cart__title">
          <h3>Có {Object.keys(products).length} sản phẩm trong giỏ hàng</h3>
        </div>
        <div>
          {Object.keys(products).length > 0 &&
            Object.keys(products).map((key) => {
              return (
                <div key={key} className="">
                  <div className="d-flex justify-content-around align-items-center">
                    <img className="pro__img" alt="" src={products[key].url} />
                    <h5>{products[key].title}</h5>

                    <div className="d-flex cart__product-options">
                      <span
                        onClick={() => {
                          dispatch({
                            type: cartConstants.PLUS_PRODUCT_CART,
                            payload: products[key],
                          });
                        }}
                      >
                        +
                      </span>
                      <input value={products[key].count} readOnly />
                      <span
                        onClick={() => {
                          dispatch({
                            type: cartConstants.SUBTRACT_PRODUCT_CART,
                            payload: products[key],
                          });
                        }}
                      >
                        -
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <del>
                        {formatPrice(products[key].price * products[key].count)}{" "}
                        đ
                      </del>

                      {products[key].discount > 0 && (
                        <span className="text-danger">
                          {formatPrice(
                            (products[key].price -
                              (products[key].price * products[key].discount) /
                                100) *
                              products[key].count
                          )}{" "}
                          đ
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-column py-3">
                    <button
                      onClick={prevCreateOrder}
                      className="btn btn-danger"
                    >
                      Tạo đơn đặt hàng
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  const applyCoupon = async () => {
    const res = await appyCouponService(coupon);
    if (res && res.status === 200) {
      dispatch({ type: appConstans.GET_CART });
    }
  };
  const prevCreateOrder = () => {
    if (auth.authenticate) {
      setOrderModal(true);
    } else {
      navigate("/login");
    }
  };
  const createOrder = async () => {
    const res = await createOrderService(true, totalAfterCoupon ? true : false);
    if (res && res.status === 200) {
      dispatch({ type: cartConstants.EMPTY_CART });
      setOrderModal(false);
      navigate("/user/order");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f8f8" }} className="px-3">
      <BreadCrumb cumbArr={crumbArr()} />
      {renderProduct()}
      <div>
        <ModalConvert
          title={"Đơn đặt hàng"}
          show={orderModal}
          onHide={() => setOrderModal(false)}
        >
          <div>
            <label>Họ và tên</label>
            <span className="ps-3">{`${auth.user.firstname} ${auth.user.lastname}`}</span>
          </div>
          <div>
            <label>Địa chỉ</label>
            <span className="ps-3">{address}</span>
          </div>
          <div>
            <label>Tổng tiền phải thanh toán</label>
            <span className="ps-3">
              {formatPrice(totalAfterCoupon ? totalAfterCoupon : cartTotal)} đ
            </span>
          </div>
          {totalAfterCoupon && <span>Có sử dụng phiếu giảm giá</span>}
          <div className="d-flex justify-content-center py-3">
            <button onClick={createOrder} className="btn btn-danger">
              Hoàn tất đặt hàng
            </button>
          </div>
        </ModalConvert>
      </div>
    </div>
  );
};

export default Cart;
