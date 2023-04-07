import React, { useEffect, useState } from "react";
import { getAllProductService } from "../../services/productService";
import ProductCard from "../ProductCard/ProductCard";

const TabBanner = ({ query, title, hasDigitalItem = false }) => {
  const [productArr, setProductArr] = useState([]);
  useEffect(() => {
    getProductArr();
  }, []);
  const getProductArr = async () => {
    const res = await getAllProductService(query, 1, 4);
    if (res && res.status === 200) {
      setProductArr(res.data.products);
    }
  };

  return (
    <div>
      <div className="ms-5">
        <h3>{title}</h3>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {productArr.length > 0 &&
          productArr.map((item, index) => {
            return (
              <div key={index}>
                {hasDigitalItem ? (
                  <ProductCard
                    title={item.title}
                    imgUrl={item.images && item.images[0]}
                    price={item.price}
                    ram={item.ram}
                    graphics={item.graphics}
                    hardDrive={item.hardDrive}
                    screen={item.screen}
                    weight={item.weight}
                    cpu={item.cpu}
                    discount={item.discount}
                    rom={item.rom}
                    path={`/${item.type}/${item.category}/${item.slug}`}
                    hasDigitalItem={true}
                  />
                ) : (
                  <ProductCard
                    title={item.title}
                    price={item.price}
                    imgUrl={item.images && item.images[0]}
                    discount={item.discount}
                    path={`/${item.type}/${item.category}/${item.slug}`}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TabBanner;
