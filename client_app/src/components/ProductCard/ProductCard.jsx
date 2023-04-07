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
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

const ProductCard = ({
  discount = 0,
  _id,
  hasBtn,
  imgUrl,
  title,
  price,
  screen,
  cpu,
  graphics,
  ram,
  hardDrive,
  weight,
  path,
  hasDigitalItem = false,
  slug,
  rom,
}) => {
  const formatedDigitalInfo = (value) => {
    return value.split(",")[0];
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="product__card-wrapper">
      <Card className="pt-2 product__card position-relative">
        <img
          onClick={() => {
            navigate(path);
          }}
          className="fluid"
          alt="Sản phẩm"
          src={imgUrl && imgUrl.url}
        />
        {discount > 0 && (
          <span className="discount__flag position-absolute">
            {discount + "%"}
          </span>
        )}
        <Card.Body className="p-2">
          <Card.Title
            style={{ cursor: "pointer" }}
            onClick={() => navigate(path)}
            tag="h5"
          >
            {title && title}
          </Card.Title>
          <div className="product__card-price d-flex justify-content-between">
            {price ? (
              <>
                <div className="current-price">
                  {discount > 0 ? (
                    <span>{formatPrice(price - (price * discount) / 100)}</span>
                  ) : (
                    <span>{formatPrice(price)}</span>
                  )}
                  <u>đ</u>
                </div>
                {discount > 0 && (
                  <del>
                    <span>{formatPrice(price)}</span>
                    <u>đ</u>
                  </del>
                )}
              </>
            ) : (
              <span className="current-price">Đang cập nhật</span>
            )}
          </div>
          {hasDigitalItem && (
            <div className="digital__container d-flex flex-wrap p-2 my-3 rounded">
              {screen && (
                <DigitalItem
                  icon={<BiLaptop size="24px" color="#b6bfc7" />}
                  title={formatedDigitalInfo(screen)}
                  tooltip="Màn hình"
                />
              )}
              {cpu && (
                <DigitalItem
                  icon={<BiChip size="24px" color="#b6bfc7" />}
                  title={formatedDigitalInfo(cpu)}
                  tooltip="CPU"
                />
              )}
              {ram && (
                <DigitalItem
                  icon={<BiMicrochip size="24px" color="#b6bfc7" />}
                  title={formatedDigitalInfo(ram)}
                  tooltip="Ram"
                />
              )}
              {rom && (
                <DigitalItem
                  icon={<BiHdd size="24px" color="#b6bfc7" />}
                  title={formatedDigitalInfo(rom)}
                  tooltip="Ổ cứng"
                />
              )}
              {hardDrive && (
                <DigitalItem
                  icon={<BiHdd size="24px" color="#b6bfc7" />}
                  title={formatedDigitalInfo(hardDrive)}
                  tooltip="Ổ cứng"
                />
              )}
              {graphics && (
                <DigitalItem
                  icon={<BiMemoryCard size="24px" color="#b6bfc7" />}
                  title={formatedDigitalInfo(graphics)}
                  tooltip="Card đồ họa"
                />
              )}
              {weight && (
                <DigitalItem
                  icon={<BiLockAlt size="24px" color="#b6bfc7" />}
                  title={weight / 1000 + " kg"}
                  tooltip="Trọng lượng"
                />
              )}
            </div>
          )}
        </Card.Body>
        {hasBtn ? (
          <div className="card_btn-group p-3">
            {_id && (
              <Button
                onClick={() => {
                  dispatch(
                    addToCart({ _id, url: imgUrl.url, price, discount, title })
                  );
                }}
                className="card__btn btn-danger"
              >
                MUA NGAY
              </Button>
            )}
            <Link
              to={slug ? `/compare-product?${slug}` : ""}
              className="card__btn btn btn-secondary"
            >
              {" "}
              SO SÁNH
            </Link>
          </div>
        ) : (
          <div className="card_btn-group"></div>
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
