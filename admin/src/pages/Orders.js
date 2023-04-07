import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/order/orderSlice";
import { formatPrice } from "../utils/formatedData";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const getClassByStatus = (status) => {
    let className = "";
    switch (status) {
      case "Delivered":
        className = "text-success";
        break;
      case "Cancelled":
        className = "text-danger";
        break;
      default:
        className = "text-warning";
        break;
    }
    return className;
  };
  const dataSource = orders.map((order, index) => {
    const createdAtString = order.createdAt;
    const createdAtDate = new Date(createdAtString);
    return {
      key: index,
      _id: order._id,
      createdAt: (
        <div className="d-flex flex-column">
          <span>{createdAtDate.toLocaleDateString()}</span>
          <span>{createdAtDate.toLocaleTimeString()}</span>
        </div>
      ),
      orderby: (
        <div className="d-flex flex-column align-items-center">
          <span>{`${order.orderby.firstname} ${order.orderby.lastname}`}</span>
          <span>{order.orderby.mobile}</span>
        </div>
      ),
      amount: (
        <div className="d-flex flex-column align-items-center">
          <span>{formatPrice(order.paymentIntent.amount)} đ</span>
          <span
            className={
              order.paymentIntent.status === "Delivered"
                ? "text-success p-1 bg-light rounded"
                : "text-danger p-1 bg-light rounded"
            }
          >
            {order.paymentIntent.status === "Delivered" ? "Paid" : "Unpaid"}
          </span>
        </div>
      ),
      status: (
        <>
          <span
            className={`${getClassByStatus(
              order.paymentIntent.status
            )} p-1 bg-light rounded`}
          >
            {order.paymentIntent.status}
          </span>
        </>
      ),
      action: (
        <>
          <Link className="fs-5 text-primary" to="/">
            <AiOutlineEye />
          </Link>
          <Link className="fs-5 text-warning ps-3" to="/">
            <BiEdit />
          </Link>
        </>
      ),
    };
  });

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Order ID",
      dataIndex: "_id",
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
    },
    {
      title: "Customer Info",
      dataIndex: "orderby",
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
    },
    {
      title: "Order Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Orders</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Orders;
