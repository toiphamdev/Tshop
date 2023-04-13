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
import { deleteCat, getCategories } from "../features/category/categorySlice";
const CategoryList = () => {
  const categories = useSelector((state) => state.category.categories);
  const [flag, setFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const dataSource = categories.map((item, index) => {
    return {
      key: index,
      title: item.title,
      slug: item.slug,
      action: (
        <>
          <Link
            className="fs-5 text-warning"
            to={`/admin/category/${item._id}`}
          >
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
    await dispatch(deleteCat(id));
    setDeleteFlag(!deleteFlag);
    setFlag(true);
    dispatch(getCategories());
  };
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.category
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
    dispatch(getCategories());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Category List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default CategoryList;
