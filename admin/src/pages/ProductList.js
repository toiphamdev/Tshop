import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { formatPrice } from "../utils/formatedData";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const ProductList = () => {
  const products = useSelector((state) => state.product.products);
  const dataSource = products.map((prod, index) => {
    return {
      key: index,
      title: prod.title,
      priceDisplay: formatPrice(prod.price) + " đ",
      price: prod.price,
      type: prod.type,
      category: prod.category,
      action: (
        <>
          <Link className="fs-5 text-warning" to="/">
            <BiEdit />
          </Link>
          <Link className="fs-5 text-danger ps-3" to={"/"}>
            <AiFillDelete />
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
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Price",
      dataIndex: "priceDisplay",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Type Category",
      dataIndex: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: "Brand Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Product List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ProductList;
