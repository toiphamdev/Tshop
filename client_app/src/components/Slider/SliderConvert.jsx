import React from "react";
import Slider from "react-slick";
import "./slider.css";

const SliderConvert = ({ imgClassName, imgArr, ...props }) => {
  const settings = {
    speed: 500,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  };

  return (
    <Slider className="slider" {...settings}>
      {imgArr.length > 0 &&
        imgArr.map((item, index) => {
          return (
            <div
              className="d-flex justify-content-center align-items-center"
              key={index}
            >
              <img
                src={item.url}
                alt=""
                className={imgClassName ? `fluid ${imgClassName}` : "fluid"}
              />
            </div>
          );
        })}
    </Slider>
  );
};

export default SliderConvert;
