import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./breadcrumb.css";

const BreadCrumb = ({ cumbArr = [], ...props }) => {
  return (
    <Breadcrumb>
      {cumbArr.length > 0 &&
        cumbArr.map((item, index) => {
          return (
            <Breadcrumb.Item key={index} href={item.path}>
              <span className="crumb__animate position-relative">
                {item.title}
              </span>
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
};

export default BreadCrumb;
