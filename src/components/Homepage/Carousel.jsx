// // src/components/Carousel.js
// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./Carousel.css";
// import SliderWrapper from "./_SlickSliderStyle";

// const Carousel = ({ slides }) => {
//   const settings = {
//     // dots: true,
//     // infinite: true,
//     // speed: 500,
//     // slidesToShow: 1, // Show one slide at a time
//     // slidesToScroll: 1,
//     // autoplay: true, // Auto-slide functionality
//     // autoplaySpeed: 3000,
//     // arrows: false, // Time in milliseconds before the next slide appears
//     dots: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     speed: 500,
//     arrows: false,
//     adaptiveHeight: true,
//     appendDots: (dots) => <ul>{dots}</ul>,
//     customPaging: (i) => (
//       <div className="ft-slick__dots--custom">
//         <div className="loading" />
//       </div>
//     ),
//   };

//   return (
//     <div className="carousel-container h-64 sm:h-80 md:h-full">
//       <SliderWrapper>
//         <Slider {...settings} className="h-64 sm:h-80 md:h-full">
//           {slides.map((slide, index) => (
//             <div key={index} className="slide">
//               <img
//                 src={slide.image}
//                 alt={slide.altText}
//                 className="w-full sm:h-72 md:h-full h-60  object-cover"
//               />
//             </div>
//           ))}
//         </Slider>
//       </SliderWrapper>
//     </div>
//   );
// };

// export default Carousel;

// src/components/Carousel.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "./Carousel.css";
import SliderWrapper from "./_SlickSliderStyle";

const Carousel = ({ slides }) => {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    speed: 500,
    arrows: false,
    adaptiveHeight: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };

  return (
    <div className="carousel-container ">
      <SliderWrapper>
        <Slider {...settings} className="">
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img
                src={slide.image}
                alt={slide.altText}
                className="w-full h-64 sm:h-80 md:h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
      </SliderWrapper>
    </div>
  );
};

export default Carousel;
