import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";
import SearchTags from "../../components/SearchTags/SearchTags";
import TagBar from "../../components/TagBar/TagBar";
import {
  getAllProductService,
  getProductDetailsService,
} from "../../services/productService";
import { formatPrice } from "../../utils";

const CompareProduct = () => {
  const crumbArr = () => {
    const outputArr = [
      { title: "Home", path: "/" },
      { title: "So sánh sản phẩm", path: null },
    ];

    return outputArr;
  };
  const location = useLocation();
  const pattern = location.search.split("?")[1];
  const matches = pattern.split("-vs-");
  const [isReady, setIsReady] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [flat, setFlat] = useState(false);
  const [hintArr, setHintArr] = useState([]);
  const designRef = useRef();
  const infoRef = useRef();
  const processorRef = useRef();
  const screenRef = useRef();
  const openSystemRef = useRef();
  const romRef = useRef();

  useEffect(() => {
    getDetailsProductCompare();
  }, [pattern]);
  const getDetailsProductCompare = async () => {
    const products = [];
    for (let i = 0; i < matches.length; i++) {
      const res = await getProductDetailsService(matches[i]);
      if (res && res.status === 200) {
        products[i] = res.data;
      }
    }
    setProductArr(products);
    setIsReady(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isReady, productArr);
    if (isReady) {
      // console.log(productArr.length);
      productArr.length === 2
        ? navigate(
            `/compare-product?${productArr[0].slug}-vs-${productArr[1].slug}`
          )
        : navigate(`/compare-product?${productArr[0].slug}`);
    }
  }, [flat]);
  useEffect(() => {
    const getHint = async (producArr) => {
      const res = await getAllProductService(
        `q=${producArr[0].title.toLowerCase()}`,
        1,
        5
      );
      if (res && res.status === 200) {
        let data = res.data.products.filter(
          (item) => producArr[0].slug !== item.slug
        );
        setHintArr(data);
      }
    };
    if (productArr.length === 1) {
      getHint(productArr);
    }
  }, [isReady]);
  if (productArr.length > 2 || productArr.length === 0) {
    return <span className="text-danger"> Cần chọn 2 sản phẩm để so sánh</span>;
  }
  if (productArr.length === 2 && productArr[0].type !== productArr[1].type) {
    return <span className="text-danger">Hai sản phẩm phải cùng loại</span>;
  }
  const handleAddProdToCompare = (item, index) => {
    const products = [...productArr];
    products[index] = item;
    setProductArr(products);
    setFlat(!flat);
  };
  return (
    <div className="px-5">
      <BreadCrumb cumbArr={crumbArr()} />
      <div className="py-3">
        <div className="text-center">
          <h4>
            So sánh {" " + productArr[0] && productArr[0].title}{" "}
            <span>{" vs "}</span> {productArr[1] && productArr[1].title}{" "}
          </h4>
        </div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 p-5">
            <SearchTags
              onChange={handleAddProdToCompare}
              tag={0}
              value={productArr[0] ? productArr[0].title : ""}
            />
            {productArr.length > 0 && (
              <div className="hint__wrapper d-flex flex-column pt-3 align-items-center">
                <img
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                  }}
                  src={productArr[0].images ? productArr[0].images[0].url : ""}
                  alt=""
                />
                <p className="py-3">
                  Chỉ từ:{" "}
                  <span className="text-danger fw-bold fs-5">
                    {" " + formatPrice(productArr[0].price) + "đ"}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="col-12 col-md-6 col-lg-6 p-5">
            <SearchTags
              onChange={handleAddProdToCompare}
              tag={1}
              value={productArr[1] ? productArr[1].title : ""}
            />
            {productArr.length === 1 && (
              <div className="hint__wrapper">
                <p className="text-muted">Gợi ý so sánh</p>
                <div className="d-flex flex-wrap">
                  {hintArr.length > 0 &&
                    hintArr.map((item, index) => {
                      return (
                        <a
                          className="link__redirect"
                          href={`/compare-product?${productArr[0].slug}-vs-${item.slug}`}
                          key={index}
                        >
                          <img
                            src={item.images ? item.images[0].url : ""}
                            alt=""
                          />
                          <h5>{item.title}</h5>
                        </a>
                      );
                    })}
                </div>
              </div>
            )}
            {productArr.length === 2 && (
              <div className="hint__wrapper d-flex flex-column pt-3 align-items-center">
                <img
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                  }}
                  src={productArr[1].images ? productArr[1].images[0].url : ""}
                  alt=""
                />
                <p className="py-3">
                  Chỉ từ:{" "}
                  <span className="text-danger fw-bold fs-5">
                    {" " + formatPrice(productArr[1].price) + "đ"}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <TagBar
        tags={[
          { label: "Thông tin hàng hóa", ref: infoRef, id: 1 },
          { label: "Thiết kế và trọng lượng", ref: designRef, id: 2 },
          { label: "Bộ xử lí", ref: processorRef, id: 3 },
          { label: "Màn hình", ref: screenRef, id: 4 },
          { label: "Bộ nhớ", ref: romRef, id: 5 },
          { label: "Hệ điều hành", ref: openSystemRef, id: 6 },
        ]}
      />
      <div className="col-12"></div>
      <div ref={infoRef} className="col-12">
        <h4>Thông tin hàng hóa</h4>
        <Table>
          <tbody>
            <tr className="table-light">
              <th>Thương hiệu</th>
              <td>{productArr[0] && productArr[0].brand}</td>
              <td>{productArr[1] && productArr[1].brand}</td>
            </tr>
            <tr className="table-light">
              <th>Xuất xứ</th>
              <td>{productArr[0] && productArr[0].origin}</td>
              <td>{productArr[1] && productArr[1].origin}</td>
            </tr>
            <tr className="table-light">
              <th>Thời điểm ra mắt</th>
              <td>{productArr[0] && productArr[0].debutYear}</td>
              <td>{productArr[1] && productArr[1].debutYear}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div ref={designRef} className="col-12">
        <h4>Thiết kế & trọng lượng</h4>
        <Table>
          <tbody>
            <tr className="table-light">
              <th>Kích thước</th>
              <td>{productArr[0] && productArr[0].size}</td>
              <td>{productArr[1] && productArr[1].size}</td>
            </tr>
            {productArr[0].weight > 0 && (
              <tr className="table-light">
                <th>Trọng lượng</th>
                <td>{productArr[0] && productArr[0].weight / 1000 + " kg"}</td>
                <td>{productArr[1] && productArr[1].weight / 1000 + " kg"}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div ref={processorRef} className="col-12">
        <h4>Bộ xử lí</h4>
        <Table>
          <tbody>
            <tr className="table-light">
              <th>Phiên bản CPU</th>
              <td>{productArr[0] && productArr[0].cpu}</td>
              <td>{productArr[1] && productArr[1].cpu}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div ref={screenRef} className="col-12">
        <h4>Màn hình</h4>
        <Table>
          <tbody>
            <tr className="table-light">
              <th>Màn hình & độ phân giải</th>
              <td>{productArr[0] && productArr[0].screen}</td>
              <td>{productArr[1] && productArr[1].screen}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div ref={romRef} className="col-12">
        <h4>Bộ nhớ</h4>
        <Table>
          <tbody>
            <tr className="table-light">
              <th>Bộ nhớ & ổ cứng</th>
              <td>{productArr[0] && productArr[0].rom}</td>
              <td>{productArr[1] && productArr[1].rom}</td>
              {productArr[0].hardDrive && (
                <>
                  <td>{productArr[0] && productArr[0].hardDrive}</td>
                  <td>{productArr[1] && productArr[1].hardDrive}</td>
                </>
              )}
            </tr>
          </tbody>
        </Table>
      </div>
      <div ref={openSystemRef} className="col-12">
        <h4>Hệ điều hành</h4>
        <Table>
          <tbody>
            <tr className="table-light">
              <th>Hệ điều hành</th>
              <td>{productArr[0] && productArr[0].operaSystem}</td>
              <td>{productArr[1] && productArr[1].operaSystem}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CompareProduct;
