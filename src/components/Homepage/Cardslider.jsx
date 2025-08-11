import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 2,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  const cards = Array.from({ length: 8 }, (_, index) => (
    <div key={index} className="p-2">
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
        <div className="bg-gray-300 h-32 w-full rounded-md mb-4"></div>
        <div className="text-lg font-semibold mb-2">Product Name {index + 1}</div>
        <div className="text-gray-500">Description</div>
        <div className="flex justify-between w-full mt-4">
          <div className="text-green-500">$20</div>
          <div className="text-gray-400 line-through">$30</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="mx-auto my-8 w-11/12">
      <Slider {...settings}>
        {cards}
      </Slider>
    </div>
  );
};

export default CardSlider;
