import React from "react";
import { Button, Card } from "react-bootstrap";
import DigitalItem from "../DigitalItem/DigitalItem";
import {
  BiChip,
  BiHdd,
  BiLaptop,
  BiLockAlt,
  BiMemoryCard,
  BiMicrochip,
} from "react-icons/bi";
import "./productcard.css";
import { Link } from "react-router-dom";

const ProductCart = (props) => {
  const { discount, hasBtn } = props;
  return (
    <Link className="product__card-wrapper" to="/">
      <Card className="p-3 product__card position-relative">
        <img
          className="fluid"
          alt="Sample"
          src="https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/11/29/638053327684236749_lenovo-ideapad-1-15amn7-xam-dd.jpg"
        />
        {!discount && (
          <span className="discount__flag position-absolute">20%</span>
        )}
        <Card.Body>
          <Card.Title tag="h5">
            Laptop Asus TUF Gaming FX506LHB-HN188W i5 10300H
          </Card.Title>
          <div className="product__card-price d-flex justify-content-between">
            <div className="current-price">
              <span>{"12.190.000 "}</span>
              <u>đ</u>
            </div>
            <del>
              <span>{"12.190.000 "}</span>
              <u>đ</u>
            </del>
          </div>
          <div className="digital__container d-flex flex-wrap p-2 my-3 rounded">
            <DigitalItem
              icon={<BiLaptop size="24px" color="#b6bfc7" />}
              title="14 inch"
              tooltip="Màn hình"
            />
            <DigitalItem
              icon={<BiChip size="24px" color="#b6bfc7" />}
              title="M1 Pro"
              tooltip="CPU"
            />
            <DigitalItem
              icon={<BiMicrochip size="24px" color="#b6bfc7" />}
              title="32 GB"
              tooltip="Ram"
            />
            <DigitalItem
              icon={<BiHdd size="24px" color="#b6bfc7" />}
              title="SSD 512 GB"
              tooltip="Ổ cứng"
            />
            <DigitalItem
              icon={<BiMemoryCard size="24px" color="#b6bfc7" />}
              title="Apple M1"
              tooltip="Card đồ họa"
            />
            <DigitalItem
              icon={<BiLockAlt size="24px" color="#b6bfc7" />}
              title="2.192 kg"
              tooltip="Trọng lượng"
            />
          </div>
        </Card.Body>
        <div className="card_btn-group p-3">
          {hasBtn && (
            <>
              <Button className="card__btn btn-danger">MUA NGAY</Button>
              <Button className="card__btn btn-secondary"> SO SÁNH</Button>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ProductCart;
