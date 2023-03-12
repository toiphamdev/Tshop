import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
} from "react-icons/fa";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-dark">
      <section className="d-flex justify-content-between p-4 text-white bg__primary">
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="" className="text-white me-4">
            <FaFacebookSquare size="20px" />
          </a>
          <a href="" className="text-white me-4">
            <FaTwitterSquare size="20px" />
          </a>
          <a href="" className="text-white me-4">
            <FaGoogle size="20px" />
          </a>
          <a href="" className="text-white me-4">
            <FaInstagram size="20px" />
          </a>
          <a href="" className="text-white me-4">
            <FaLinkedin size="20px" />
          </a>
          <a href="https://github.com/toiphamdev" className="text-white me-4">
            <FaGithubSquare size="20px" />
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="logo">Tshop</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Sản phẩm</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <a href="#!" className="text-dark">
                  MDBootstrap
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  MDWordPress
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  BrandFlow
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Bootstrap Angular
                </a>
              </p>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Tiện ích</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <a href="#!" className="text-dark">
                  Your Account
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Become an Affiliate
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Shipping Rates
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Help
                </a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Liên hệ</h6>
              <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{
                  width: "60px",
                  backgroundColor: "#7c4dff",
                  height: "2px",
                }}
              />
              <p>
                <i className="fas fa-home mr-3"></i> Tư Nghĩa, Quảng Ngãi
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> toiphamasi79@gmail.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> + 0988375694
              </p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Powered by:
        <a className="text-dark" href="https://github.com/toiphamdev">
          toiphamdev
        </a>
      </div>
    </footer>
  );
};

export default Footer;
