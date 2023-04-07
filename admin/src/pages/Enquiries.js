import React, { useEffect } from "react";
import { Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiries } from "../features/enquiry/enqSlice";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};
const Enquiries = () => {
  const enqs = useSelector((state) => state.enq.enquiries);
  const dataSource = enqs.map((enq, index) => {
    return {
      key: index,
      name: enq.name,
      email: enq.email,
      comment: enq.comment,
      date: enq.createdAt,
      status: (
        <>
          <Select
            showSearch
            style={{ width: 160 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            defaultValue={enq.status}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "Submitted",
                label: "Submitted",
              },
              {
                value: "Contacted",
                label: "Contacted",
              },
              {
                value: "In Progress",
                label: "In Progress",
              },
              {
                value: "Resolved",
                label: "Resolved",
              },
            ]}
          />
        </>
      ),
      action: (
        <>
          <Link className="fs-5 text-danger " to={"/"}>
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  return (
    <div>
      <h3 className="mb-4">Enquiries</h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Enquiries;
