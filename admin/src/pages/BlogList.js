import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const BlogList = () => {
  const blogs = useSelector((state) => state.blog.blogs);
  const dataSource = blogs.map((blog, index) => {
    return {
      key: index,
      title: blog.title,
      numViews: blog.numViews,
      category: blog.category,
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
      title: "Views",
      dataIndex: "numViews",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Blog List</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default BlogList;
