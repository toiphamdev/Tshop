import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";
const Customers = () => {
  const customers = useSelector((state) => state.customer.customers);
  const dataSource = customers.map((cus, index) => {
    return {
      key: index,
      name: `${cus.firstname} ${cus.lastname}`,
      mobile: cus.mobile,
      email: cus.email,
    };
  });
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "mobile",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Customers</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Customers;
