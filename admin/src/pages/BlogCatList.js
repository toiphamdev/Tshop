import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCats } from "../features/blogCategory/blogCatSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const BlogCatList = () => {
  const blogCategories = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const dataSource = blogCategories.map((item, index) => {
    return {
      key: index,
      title: item.title,
      slug: item.slug,
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
