import React, { useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import { BsFillStarFill } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import "./productdetail.css";
import { Link } from "react-router-dom";
import SliderConvert from "../../components/Slider/SliderConvert";
import DigitalItem from "../../components/DigitalItem/DigitalItem";
import {
  BiChip,
  BiHdd,
  BiLaptop,
  BiLockAlt,
  BiMemoryCard,
  BiMicrochip,
} from "react-icons/bi";
import { Table } from "react-bootstrap";

const ProductDetail = () => {
  const cumbArr = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/apple-macbook",
      title: "Apple(Macbook)",
    },
  ];
  const [star, setStar] = useState(5);
  const [currentImg, setcurentImg] = useState("");
  const genarateStarArr = (num) => {
    let starArr = [];
    for (let i = 0; i < num; i++) {
      starArr.push(i);
    }
    return starArr;
  };
  return (
    <div className="px-5">
      <BreadCrumb cumbArr={cumbArr} />
      <div className="row py-5">
        <div className="col-12 d-flex flex-wrap product__title-wrapper">
          <div className="col-12 col-md-6 col-lg-8">
            <h3 className="product__detail-title">
              Laptop MSI Modern 14 B11MOU 852VN i5 1155G7/8GB/512GB/14"FHD/Win
              10
            </h3>
          </div>
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="star">
              {genarateStarArr(star).map((item) => {
                return (
                  <BsFillStarFill
                    key={item}
                    color="#ea9d02"
                    className="star__icon"
                  />
                );
              })}
            </div>
            <div className="option__wrapper d-flex">
              <div className="option__item">
                <Link to="#review" className="crumb__animate">
                  <span className="px-2">206 đánh giá</span>
                </Link>
              </div>
              <div className="option__item ">
                <Link
                  to="#"
                  className="crumb__animate d-flex align-items-center"
                >
                  <BsPlusCircle size="16px" />
                  <span className="px-2">So sánh</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 d-flex flex-wrap py-3">
          <div className="col-12 col-md-6 col-lg-6 product__slide">
            <div className="col-12">
              <img className="fluid col-12" src={currentImg} alt="" />
              <div className="col-12">
                <SliderConvert />
              </div>
              <div className="col-12">
                <div className="digital__container d-flex flex-wrap p-2 my-3 rounded">
                  <DigitalItem
                    icon={<BiLaptop size="18px" color="#b6bfc7" />}
                    title="14.0 inch, 1920 x 1080 Pixels, IPS, 60 Hz, 300 nits, IPS LCD"
                    tooltip="Màn hình"
                  />
                  <DigitalItem
                    icon={<BiChip size="18px" color="#b6bfc7" />}
                    title="Intel, Core i5, 11400H"
                    tooltip="CPU"
                  />
                  <DigitalItem
                    icon={<BiMicrochip size="18px" color="#b6bfc7" />}
                    title="8 GB, DDR4, 3200 MHz"
                    tooltip="Ram"
                  />
                  <DigitalItem
                    icon={<BiHdd size="18px" color="#b6bfc7" />}
                    title="SSD 512 GB"
                    tooltip="Ổ cứng"
                  />
                  <DigitalItem
                    icon={<BiMemoryCard size="18px" color="#b6bfc7" />}
                    title="NVIDIA GeForce RTX 3050 4GB; Intel UHD Graphics"
                    tooltip="Card đồ họa"
                  />
                  <DigitalItem
                    icon={<BiLockAlt size="18px" color="#b6bfc7" />}
                    title="2.192 kg"
                    tooltip="Trọng lượng"
                  />
                </div>
              </div>
              <div className="col-12">
                <btn
                  style={{ width: "100%", padding: "12px" }}
                  className="btn btn-danger"
                >
                  Thêm vào giỏ hàng
                </btn>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 product__info">
            <div className="col-12 product__price d-flex justify-content-between my-3">
              <span>
                17.490.000 <u>đ</u>
              </span>
              <del>
                20.990.000 <u>đ</u>
              </del>
            </div>
            <div className="col-12 product__digital-info">
              <Table size="sm" bordered>
                <tbody>
                  <tr className="table-secondary">
                    <th scope="row">Description</th>
                    <td>
                      Asus TUF Gaming F15 FX506LHB-HN188W là chiếc laptop gaming
                      giá rẻ với thiết kế tuyệt đẹp, phong cách chuẩn game thủ
                      và cấu hình mạnh mẽ cho cả học tập, công việc cũng như
                      chơi game. Bên cạnh đó là độ bền chuẩn quân đội đã làm nên
                      tên tuổi của dòng TUF.
                    </td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Màn hình</th>
                    <td>
                      15.6 inch, 1920 x 1080 Pixels, IPS, 144 Hz, Anti-glare
                      LED-backlit
                    </td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">CPU</th>
                    <td>Intel, Core i5, 10300H</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">RAM</th>
                    <td>8 GB (1 thanh 8 GB), DDR4, 2933 MHz</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Ổ cứng</th>
                    <td>SSD 512 GB</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Đồ họa</th>
                    <td>NVIDIA GeForce GTX 1650 4GB; Intel UHD Graphics</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Hệ điều hành</th>
                    <td> Windows 11</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Trọng lượng</th>
                    <td>2.3 kg</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Kích thước</th>
                    <td> 359 * 256 * 24.9 mm</td>
                  </tr>
                  <tr className="table-light">
                    <th scope="row">Xuất xứ</th>
                    <td> Trung Quốc</td>
                  </tr>
                  <tr className="table-secondary">
                    <th scope="row">Năm ra mắt</th>
                    <td>2022</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
