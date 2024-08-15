import React from "react";
import data from "../utils/banner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../pages/SlickCarousal.css";

const CarousalComponent = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full h-auto mb-20">
      <div className="w-full h-full">
        <Slider {...settings} className="mx-2 my-2">
          {data.map((item) => {
            return (
              <div key={item.id} className="w-full h-[350px] bg-yellow-300">
                <img
                  className="w-full h-full"
                  src={item.imageURL}
                  alt="banner"
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default CarousalComponent;
