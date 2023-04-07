import ProductCard from "../../components/ProductCard/ProductCard";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import SliderConvert from "../../components/Slider/SliderConvert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  convertDataSelectFromCat,
  convertSelectedDataCat,
  createParameter,
  findItemsBySlug,
  getCatFromSlug,
  getSelectedDataFormValue,
  getServerQuery,
} from "../../utils";
import { priceFilterArr, sortArr } from "./filterConstant";
import { getAllProductService } from "../../services/productService";
import Paginate from "../../components/Paginate/Paginate";
import BreadCrumb from "../../components/Breadcrumb/BreadCrumb";

const ProductFilter = () => {
  // const [brand, setBrand] = useState("");
  const app = useSelector((state) => state.app);
  const { type, category } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryBrand = params.get("hang-san-xuat");
  const queryPrice = params.get("muc-gia");
  const querySort = params.get("sort");
  const itemsCatProd = findItemsBySlug(app.prodCategories, type);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [sortValue, setSortValue] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const imageArr = [
    {
      url: "https://img.freepik.com/free-vector/gradient-isometric-laptop-technology-background_52683-6159.jpg?w=900&t=st=1679038443~exp=1679039043~hmac=cc4e97be7d3dacf5854cfeab10e887c7e1797ee6df9027ff829d7ebce9414a7c",
    },
    {
      url: "https://img.freepik.com/free-vector/gradient-isometric-laptop-technology-background_52683-6159.jpg?w=900&t=st=1679038443~exp=1679039043~hmac=cc4e97be7d3dacf5854cfeab10e887c7e1797ee6df9027ff829d7ebce9414a7c",
    },
  ];
  useEffect(() => {
    handleInitData();
    // setIsReady(true);
  }, [app.prodCategories]);
  const handleInitData = () => {
    const catArr = convertDataSelectFromCat(itemsCatProd);
    setBrandArr(catArr);
    //khởi tạo giá trị của category hãng sản xuất
    if (category && catArr.length > 0) {
      const brandselect = [...selectedBrand];
      brandselect[0] = convertSelectedDataCat(catArr, category);
      setSelectedBrand(brandselect);
      if (queryPrice) {
        setSelectedPrice(getSelectedDataFormValue(priceFilterArr, queryPrice));
      }
      //Khởi tạo giá trị của sort
      if (querySort) {
        setSortValue(getSelectedDataFormValue(sortArr, querySort));
      }
    }
    if (queryBrand && catArr.length > 0) {
      const brands = queryBrand.split(",");
      const brandselect = [];
      for (let brand of brands) {
        let dataselect = convertSelectedDataCat(catArr, brand);
        brandselect.push(dataselect);
      }
      setSelectedBrand(brandselect);
      //Khởi tạo giá trị của price
      if (queryPrice) {
        setSelectedPrice(getSelectedDataFormValue(priceFilterArr, queryPrice));
      }
      //Khởi tạo giá trị của sort
      if (querySort) {
        setSortValue(getSelectedDataFormValue(sortArr, querySort));
      }
    }
    setIsReady(true);
  };
  const getAllProduct = async (query) => {
    const res = await getAllProductService(query, currentPage, 12);
    if (res && res.status === 200) {
      setCurrentPage(res.data.activePage);
      setTotalPage(res.data.pageCount);
      setProductArr(res.data.products);
    }
  };
  useEffect(() => {
    if (isReady) {
      navigate(
        `/${type}${createParameter(
          selectedBrand,
          selectedPrice,
          sortValue,
          type
        )}`
      );
    }
  }, [selectedBrand, selectedPrice, sortValue]);

  const serverParams = getServerQuery(
    type,
    category,
    queryBrand,
    getSelectedDataFormValue(priceFilterArr, queryPrice),
    getSelectedDataFormValue(sortArr, querySort)
  );
  useEffect(() => {
    if (serverParams) {
      getAllProduct(serverParams);
    }
  }, [serverParams, currentPage]);
  const crumbArr = () => {
    const outputArr = [{ title: "Home", path: "/" }];
    const typeSlug = getCatFromSlug(app.prodCategories, type);
    const categorySlug = getCatFromSlug(app.prodCategories, category);
    if (typeSlug) {
      outputArr.push({
        title: typeSlug?.title,
        path: `/${typeSlug?.slug}`,
      });
    }
    if (categorySlug) {
      outputArr.push({
        title: categorySlug?.title,
        path: `/${typeSlug?.slug}/${categorySlug.slug}`,
      });
    }
    return outputArr;
  };

  return (
    <div className="pb-5 ps-5 pe-5">
      <BreadCrumb cumbArr={crumbArr()} />
      <div className="productfilter__slider pt-5 pb-5">
        <SliderConvert imgClassName={"normal__img"} imgArr={imageArr} />
      </div>
      <div className="product__filter-wrapper row">
        <div className=" col col-12 col-md-6 col-lg-3">
          <div className="filter__section">
            <h5 className="filter__section-title">Hãng sản xuất</h5>
            <Select
              placeholder="Chọn hãng"
              isMulti
              value={selectedBrand}
              onChange={(option) => setSelectedBrand(option)}
              options={brandArr}
            />
          </div>
          <div className="filter__section">
            <h5 className="filter__section-title">Mức giá</h5>
            <Select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e)}
              placeholder="Chọn giá"
              options={priceFilterArr}
            />
          </div>
        </div>
        <div className="filter__product col col-12 col-md-6 col-lg-9">
          <div className="filter__product-wrapper d-flex flex-wrap">
            <div className="col-12">
              <div className="sort__category-wrapper pc_item align-items-center p-3 m-3">
                <span>Ưu tiên xem: </span>
                <div className="d-flex sort__category">
                  {sortArr.length > 0 &&
                    sortArr.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => setSortValue(item)}
                          className={
                            sortValue.value === item.value
                              ? "btn__secondary tab__active"
                              : "btn__secondary"
                          }
                        >
                          {item.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            </div>
            <div>
              
            </div>
            {productArr.length > 0 &&
              productArr.map((item, index) => {
                return (
                  <ProductCard
                    key={index}
                    title={item.title}
                    imgUrl={item.images && item.images[0]}
                    price={item.price}
                    ram={item.ram}
                    graphics={item.graphics}
                    hardDrive={item.hardDrive}
                    screen={item.screen}
                    weight={item.weight}
                    hasBtn={true}
                    cpu={item.cpu}
                    discount={item.discount}
                    path={`/${item.type}/${item.category}/${item.slug}`}
                    slug={item.slug}
                    _id={item._id}
                    hasDigitalItem
                  />
                );
              })}
            <div></div>
          </div>
          <div className="py-5">
            {totalPage > 1 && (
              <div className="product__comment-paginate">
                <Paginate
                  totalItems={totalPage}
                  activePage={currentPage}
                  onSelectPage={setCurrentPage}
                />
              </div>
            )}
            {productArr.length === 0 && (
              <div className="text-center">
                <span className=" text-danger">Chưa có đánh giá...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
