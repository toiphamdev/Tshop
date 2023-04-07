import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import ProgressBarConvert from "../../components/ProgressBarConvert/ProgressBarConvert";
import { getOrderByUserSevicce } from "../../services/authService";
import { formatPrice } from "../../utils";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrderByUser = async () => {
      const res = await getOrderByUserSevicce();
      if (res && res.status === 200) {
        setOrders(res.data);
      }
    };
    getOrderByUser();
  }, []);
  console.log(orders);
  return (
    <div className="block__wrapper py-2">
      {orders.length > 0 &&
        orders.map((item, index) => {
          return (
            <div className="p-3 rounded m-3 bg-light" key={index}>
              <h5>{`Mã hóa đơn : ${item._id}`}</h5>
              <span>{`Tổng chi phí : ${formatPrice(
                item.paymentIntent.amount
              )} đ`}</span>
              <Dropdown className="py-3">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  Xem chi tiết
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "100%" }}>
                  {item.products.length > 0 &&
                    item.products.map((prod, index) => {
                      return (
                        <Dropdown.Item
                          className="d-flex justify-content-between align-items-center"
                          key={index}
                        >
                          <img
                            className="order__image"
                            alt=""
                            src={
                              prod.product &&
                              prod.product.images &&
                              prod.product.images[0].url
                            }
                          />
                          <span>{prod.product && prod.product.title}</span>
                          <span>{prod.count}</span>
                          <span>
                            {prod.product && formatPrice(prod.product.price)} đ
                          </span>
                        </Dropdown.Item>
                      );
                    })}
                </Dropdown.Menu>
              </Dropdown>
              <ProgressBarConvert status={item.orderStatus} />
            </div>
          );
        })}
    </div>
  );
};

export default UserOrder;
