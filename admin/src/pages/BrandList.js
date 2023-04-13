import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCat,
  getBlogCats,
} from "../features/blogCategory/blogCatSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { deleteBrand, getBrands } from "../features/brand/brandSlice";
const BrandList = () => {
  const brands = useSelector((state) => state.brand.brands);
  const [flag, setFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const dataSource = brands.map((item, index) => {
    return {
      key: index,
      title: item.title,
      slug: item.slug,
      action: (
        <>
          <Link className="fs-5 text-warning" to={`/admin/brand/${item._id}`}>
            <BiEdit />
          </Link>
          <span
            className="fs-5 text-danger ps-3 "
            onClick={() => handleDelete(item._id)}
          >
            <AiFillDelete />
          </span>
        </>
      ),
    };
  });
  const handleDelete = async (id) => {
    await dispatch(deleteBrand(id));
    setDeleteFlag(!deleteFlag);
    setFlag(true);
    dispatch(getBrands());
  };
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.brand
  );

  useEffect(() => {
    if (isSuccess && flag && !isLoading) {
      toast.success(message);
    }
    if (isError && flag && !isLoading) {
      toast.error(message);
    }
  }, [isError, isSuccess, deleteFlag]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrands());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Brand List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default BrandList;
