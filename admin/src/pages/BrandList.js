import React from "react";
import { Table } from "antd";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    product: 32,
    status: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    product: 42,
    status: "10 Downing Street",
  },
];

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
];
const BrandList = () => {
  return (
    <div>
      <h3 className="mb-4">Brand List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default BrandList;
