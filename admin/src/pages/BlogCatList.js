import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogCat,
  getBlogCats,
  resetState,
} from "../features/blogCategory/blogCatSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
const BlogCatList = () => {
  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const [flag, setFlag] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const dataSource = blogCategories.map((item, index) => {
    return {
      key: index,
      title: item.title,
      slug: item.slug,
      action: (
        <>
          <Link
            className="fs-5 text-warning"
            to={`/admin/blog-category/${item._id}`}
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
    await dispatch(deleteBlogCat(id));
    setDeleteFlag(!deleteFlag);
    setFlag(true);
    dispatch(getBlogCats());
  };
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.blogCategory
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
    dispatch(getBlogCats());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Blog Category List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default BlogCatList;
