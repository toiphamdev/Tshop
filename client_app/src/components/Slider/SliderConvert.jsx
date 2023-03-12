import React from "react";
import Slider from "react-slick";
import "./slider.css";

const SliderConvert = ({}) => {
  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const imgArr = [
    {
      path: "https://images.fpt.shop/unsafe/fit-in/800x800/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2021/9/4/637663485446763324_msi-modern-14-xam-1.jpg",
    },
    {
      path: "https://images.fpt.shop/unsafe/fit-in/800x800/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2021/9/4/637663485446763324_msi-modern-14-xam-1.jpg",
    },
    {
      path: "https://images.fpt.shop/unsafe/fit-in/800x800/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2021/9/4/637663485446763324_msi-modern-14-xam-1.jpg",
    },
    {
      path: "https://images.fpt.shop/unsafe/fit-in/800x800/filters:quality(90):fill(white):upscale()/fptshop.com.vn/Uploads/Originals/2021/9/4/637663485446763324_msi-modern-14-xam-1.jpg",
    },
  ];
  return (
    <Slider className="slider" {...settings}>
      {imgArr.length > 0 &&
        imgArr.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.path} alt="" className="fluid slide__img" />
            </div>
          );
        })}
    </Slider>
  );
};

export default SliderConvert;
