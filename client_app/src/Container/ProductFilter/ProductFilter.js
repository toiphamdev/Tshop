import ProductCart from "../../components/ProductCard/ProductCart";
import Select from "react-select";

import React, { useState } from "react";

const ProductFilter = () => {
  // const [brand, setBrand] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  return (
    <div className="product__filter-wrapper row">
      <div className=" col col-12 col-md-6 col-lg-3">
        <div className="filter__section">
          <h5 className="filter__section-title">Hãng sản xuất</h5>
          <Select
            value={selectedBrand}
            placeholder="Chọn hãng"
            onChange={(e) => setSelectedBrand(e)}
            options={[{ value: "Dell", label: "Dell" }]}
          />
        </div>
        <div className="filter__section">
          <h5 className="filter__section-title">Mức giá</h5>
          <Select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e)}
            placeholder="Chọn giá"
            options={[{ value: "price[lt]=10000000", label: "Dưới 10 triệu" }]}
          />
        </div>
      </div>
      <div className="filter__product col col-12 col-md-6 col-lg-9">
        <div className="filter__product-wrapper d-flex flex-wrap">
          <div className="col-12">
            <div className="sort__category-wrapper pc_item align-items-center p-3 m-3">
              <span>Ưu tiên xem: </span>
              <div className="d-flex sort__category">
                <button className="btn__secondary ">Bán chạy nhất</button>
                <button className="btn__secondary">Giá cao</button>
                <button className="btn__secondary">Giá thấp</button>
              </div>
            </div>
          </div>
          <div className="col col-12 col-md-12 col-lg-6 col-xl-4">
            <ProductCart />
          </div>
          <div className="col col-12 col-md-12 col-lg-6 col-xl-4">
            <ProductCart />
          </div>
          <div className="col col-12 col-md-12 col-lg-6 col-xl-4">
            <ProductCart />
          </div>
          <div className="col col-12 col-md-12 col-lg-6 col-xl-4">
            <ProductCart />
          </div>
          <div className="col col-12 col-md-12 col-lg-6 col-xl-4">
            <ProductCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
