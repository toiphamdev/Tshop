import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import {
  BsFillCameraFill,
  BsFillStarFill,
  BsFillWebcamFill,
  BsStar,
} from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import "./productdetail.css";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getDetailsProduct } from "../../redux/actions";
import { genarateStarArr, getCatFromSlug } from "../../utils";
import { formatPrice } from "../../utils";
import { convertDataRating } from "../../utils";
import RatingDetails from "../../components/RatingDetails/RatingDetails";
import CommentWrapper from "../../components/Comment/CommentWrapper";
import ModalConvert from "../../components/ModalConvert/ModalConvert";
import RatingStar from "../../components/RatingStar/RatingStar";
import { ratingProductService } from "../../services/productService";
import ScrollToTop from "../../components/ScrollToTop";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const app = useSelector((state) => state.app);
  const ratingRef = useRef(null);
  const { productSlug, type, category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cumbArr = () => {
    const outputArr = [{ title: "Home", path: "/" }];
    const typeSlug = getCatFromSlug(app.prodCategories, type);
    const categorySlug = getCatFromSlug(app.prodCategories, category);
    if (typeSlug && categorySlug) {
      outputArr.push({
        title: typeSlug?.title,
        path: `/${typeSlug?.slug}`,
      });
      outputArr.push({
        title: categorySlug?.title,
        path: `/${typeSlug?.slug}/${categorySlug.slug}`,
      });
    }
    return outputArr;
  };
  const [productDetails, setProductDetails] = useState({});
  const ratingDetails = productDetails.ratings
    ? convertDataRating(productDetails.ratings)
    : {};
  const [ratingModal, setRatingModal] = useState(false);
  const [star, setStar] = useState(0);
  const [detailMessStar, setDetailMessStar] = useState("");
  const [ratingMess, setRatingMess] = useState("");
  const [flagRating, setFlagRating] = useState(false);
  const handleSetMessStar = (num) => {
    switch (num) {
      case 1:
        setDetailMessStar("Không thích");

        break;
      case 2:
        setDetailMessStar("Tạm được");

        break;
      case 3:
        setDetailMessStar("Bình thường");

        break;
      case 4:
        setDetailMessStar("Hài lòng");

        break;
      case 5:
        setDetailMessStar("Tuyệt vời");

        break;
      default:
        break;
    }
  };
  const handleRatingProduct = async () => {
    const res = await ratingProductService({
      star: star,
      comment: ratingMess,
      prodId: productDetails._id,
    });
    if (res && res.status === 200) {
      setStar(0);
      setRatingModal(false);
      setFlagRating(!flagRating);
    }
  };
  useEffect(() => {
    dispatch(getDetailsProduct(productSlug));
  }, []);
  useEffect(() => {
    if (product.productDetails === null) {
      navigate("/content/not-found");
    } else {
      setProductDetails(product.productDetails);
    }
  }, [product.productDetails]);
  useEffect(() => {
    handleSetMessStar(star);
  }, [star]);

  return (
    <div className="px-5">
      <ScrollToTop />
      <BreadCrumb cumbArr={cumbArr()} />
      <div className="row py-5">
        <div className="col-12 d-flex flex-wrap product__title-wrapper">
          <div className="col-12 col-md-6 col-lg-8">
            <h3 className="product__detail-title">{productDetails.title}</h3>
          </div>
          <div className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="star d-flex">
              {genarateStarArr(productDetails.totalrating).map((item) => {
                return (
                  <div className="star__icon" key={item.stt}>
                    {item.hasStar ? (
                      <BsFillStarFill color="#ea9d02" />
                    ) : (
                      <BsStar color="#ea9d02" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="option__wrapper d-flex">
              <div className="option__item">
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    ratingRef.current.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="crumb__animate"
                >
                  <span className="px-2">
                    {productDetails.ratings && productDetails.ratings.length}{" "}
                    đánh giá
                  </span>
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
        <div className="col-12 d-flex flex-wrap py-3 product__desc">
          <div className="col-12 col-md-6 col-lg-6 product__slide">
            <div className="col-12">
              <div className="col-12 product__detail-slide">
                <SliderConvert
                  imgClassName={"slide__img"}
                  imgArr={productDetails.images ? productDetails.images : []}
                />
              </div>
              <div className="col-12">
                <div className="digital__container d-flex flex-wrap p-2 my-5 rounded">
                  {productDetails.screen && (
                    <DigitalItem
                      icon={<BiLaptop size="18px" color="#b6bfc7" />}
                      title={productDetails.screen}
                      tooltip="Màn hình"
                    />
                  )}
                  {productDetails.selfieCamera && (
                    <DigitalItem
                      icon={<BsFillWebcamFill size="18px" color="#b6bfc7" />}
                      title={productDetails.selfieCamera}
                      tooltip="Camera Selfie"
                    />
                  )}
                  {productDetails.rearCamera && (
                    <DigitalItem
                      icon={<BsFillCameraFill size="18px" color="#b6bfc7" />}
                      title={productDetails.rearCamera}
                      tooltip="Camera sau"
                    />
                  )}

                  {productDetails.cpu && (
                    <DigitalItem
                      icon={<BiChip size="18px" color="#b6bfc7" />}
                      title={productDetails.cpu}
                      tooltip="CPU"
                    />
                  )}
                  {productDetails.ram && (
                    <DigitalItem
                      icon={<BiMicrochip size="18px" color="#b6bfc7" />}
                      title={productDetails.ram}
                      tooltip="Ram"
                    />
                  )}
                  {productDetails.rom && (
                    <DigitalItem
                      icon={<BiHdd size="18px" color="#b6bfc7" />}
                      title={productDetails.rom}
                      tooltip="Bộ nhớ trong"
                    />
                  )}

                  {productDetails.hardDrive && (
                    <DigitalItem
                      icon={<BiHdd size="18px" color="#b6bfc7" />}
                      title={productDetails.hardDrive}
                      tooltip="Ổ cứng"
                    />
                  )}
                  {productDetails.graphics && (
                    <DigitalItem
                      icon={<BiMemoryCard size="18px" color="#b6bfc7" />}
                      title={productDetails.graphics}
                      tooltip="Card đồ họa"
                    />
                  )}
                  {productDetails.weight && (
                    <DigitalItem
                      icon={<BiLockAlt size="18px" color="#b6bfc7" />}
                      title={productDetails.weight / 1000 + " kg"}
                      tooltip="Trọng lượng"
                    />
                  )}
                </div>
              </div>
              <div className="col-12">
                <button
                  style={{ width: "100%", padding: "12px" }}
                  className="btn btn-danger"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 product__info">
            <div className="col-12 product__price d-flex justify-content-between my-3">
              <span>
                {productDetails.price &&
                  formatPrice(
                    productDetails.price -
                      (productDetails.price * productDetails.discount) / 100
                  )}{" "}
                <u>đ</u>
              </span>
              <del>
                {productDetails.price && formatPrice(productDetails.price)}{" "}
                <u>đ</u>
              </del>
            </div>
            <div className="col-12 product__digital-info">
              <Table size="sm" bordered>
                <tbody>
                  {productDetails.description && (
                    <tr className="table-light">
                      <th scope="row">Mô tả</th>
                      <td>{productDetails.description}</td>
                    </tr>
                  )}
                  {productDetails.screen && (
                    <tr className="table-light">
                      <th scope="row">Màn hình</th>
                      <td>{productDetails.screen}</td>
                    </tr>
                  )}
                  {productDetails.rearCamera && (
                    <tr className="table-light">
                      <th scope="row">Camera sau</th>
                      <td>{productDetails.rearCamera}</td>
                    </tr>
                  )}

                  {productDetails.selfieCamera && (
                    <tr className="table-light">
                      <th scope="row">Camera Selfie</th>
                      <td>{productDetails.selfieCamera}</td>
                    </tr>
                  )}

                  {productDetails.cpu && (
                    <tr className="table-light">
                      <th scope="row">CPU</th>
                      <td>{productDetails.cpu}</td>
                    </tr>
                  )}
                  {productDetails.ram && (
                    <tr className="table-light">
                      <th scope="row">RAM</th>
                      <td>{productDetails.ram}</td>
                    </tr>
                  )}
                  {productDetails.rom && (
                    <tr className="table-light">
                      <th scope="row">Bộ nhớ trong</th>
                      <td>{productDetails.rom}</td>
                    </tr>
                  )}
                  {productDetails.hardDrive && (
                    <tr className="table-light">
                      <th scope="row">Ổ cứng</th>
                      <td>{productDetails.hardDrive}</td>
                    </tr>
                  )}
                  {productDetails.graphics && (
                    <tr className="table-light">
                      <th scope="row">Đồ họa</th>
                      <td>{productDetails.graphics}</td>
                    </tr>
                  )}
                  {productDetails.batteryCapacity && (
                    <tr className="table-light">
                      <th scope="row">Dung lượng pin</th>
                      <td>{productDetails.batteryCapacity}</td>
                    </tr>
                  )}
                  {productDetails.sim && (
                    <tr className="table-light">
                      <th scope="row">Thẻ sim</th>
                      <td>{productDetails.sim}</td>
                    </tr>
                  )}
                  {productDetails.operaSystem && (
                    <tr className="table-light">
                      <th scope="row">Hệ điều hành</th>
                      <td>{productDetails.operaSystem}</td>
                    </tr>
                  )}
                  {productDetails.weight && (
                    <tr className="table-light">
                      <th scope="row">Trọng lượng</th>
                      <td>{productDetails.weight / 1000} kg</td>
                    </tr>
                  )}
                  {productDetails.size && (
                    <tr className="table-light">
                      <th scope="row">Kích thước</th>
                      <td>{productDetails.size}</td>
                    </tr>
                  )}
                  {productDetails.origin && (
                    <tr className="table-light">
                      <th scope="row">Xuất xứ</th>
                      <td>{productDetails.origin}</td>
                    </tr>
                  )}
                  {productDetails.debutYear && (
                    <tr className="table-light">
                      <th scope="row">Năm ra mắt</th>
                      <td>{productDetails.debutYear}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <div ref={ratingRef} className="col-12 rating__wrapper my-3 p-3">
          <div className="col-12 px-3 py-3 rating__title">
            <h3>Đánh giá sản phẩm</h3>
          </div>
          <div className="col-12 rating__header d-flex align-items-center flex-wrap p-3 ">
            <div className="col-12 col-xl-4 rating d-flex flex-column align-items-center">
              <div className="">
                <h5>Đánh giá trung bình</h5>
              </div>
              <div className="total__rating d-flex align-items-center justify-contnent-center">
                <span>{productDetails.totalrating}</span>
                <span>/</span>
                <span>5</span>
              </div>
              <div className="star d-flex">
                {genarateStarArr(productDetails.totalrating).map((item) => {
                  return (
                    <div className="star__icon" key={item.stt}>
                      {item.hasStar ? (
                        <BsFillStarFill color="#ea9d02" />
                      ) : (
                        <BsStar color="#ea9d02" />
                      )}
                    </div>
                  );
                })}
              </div>
              <span className="p-2 text-muted">
                {productDetails.ratings && productDetails.ratings.length} đánh
                giá
              </span>
            </div>
            <div className="col-12 col-xl-4 rating__details d-flex flex-column align-items-center">
              {Object.keys(ratingDetails).length > 0 &&
                Object.keys(ratingDetails).map((item, index) => {
                  return (
                    <RatingDetails
                      key={index}
                      star={item}
                      quantity={ratingDetails[item].count}
                      totalrating={
                        productDetails.ratings && productDetails.ratings.length
                      }
                    />
                  );
                })}
            </div>
            <div className="col-12 col-xl-4 rating__options d-flex flex-column align-items-center">
              <h6>Bạn đã dùng sản phẩm này ?</h6>
              <button
                onClick={() => setRatingModal(true)}
                className="btn btn-danger"
              >
                ĐÁNH GIÁ
              </button>
            </div>
          </div>
          <div className="col-12">
            <CommentWrapper flagRating={flagRating} />
          </div>
        </div>
      </div>
      <ModalConvert
        title="Đánh giá sản phẩm"
        show={ratingModal}
        onHide={() => setRatingModal(false)}
      >
        <div className="d-flex flex-column w-100">
          <div className="d-flex justify-content-center">
            <img
              className="fluid w-50"
              src={
                productDetails.images &&
                productDetails.images.length > 0 &&
                productDetails.images[0].url
              }
              alt="Sản phẩm"
            />
          </div>
          <div>
            <h3>{productDetails.title}</h3>
          </div>
          <div className="mx-auto text-center py-3">
            <RatingStar setStar={setStar} />
            {star > 0 && (
              <span style={{ lineHeight: "30px" }}>{detailMessStar}</span>
            )}
          </div>
          <div className="text-center mt-3">
            <div>
              <textarea
                className="form-control"
                value={ratingMess}
                onChange={(e) => {
                  setRatingMess(e.target.value);
                }}
                placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm"
              />
            </div>
            <button
              onClick={() => handleRatingProduct()}
              className="btn btn-danger mt-3"
            >
              HOÀN TẤT
            </button>
          </div>
        </div>
      </ModalConvert>
    </div>
  );
};

export default ProductDetail;
