import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../access/images/404.png";

const NotFound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center p-3">
          <h3 className="logo">Tshop</h3>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <div className="col-12 col-md-8 col-xl-6 ">
            <img
              style={{ width: "100%" }}
              src={notfound}
              className="fluid"
              alt="404 not found"
            />
          </div>
        </div>
        <div className="col-12 text-center p-3">
          <h3>Không tìm thấy trang này.</h3>
          <Link to="/">Trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
