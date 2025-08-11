import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import { NextArrow, PrevArrow } from './CustomArrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CardContainer.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';

const CardContainer = () => {
    const [slider, setSlider] = useState(null);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const totalSlides = filteredProducts.length - 4;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        // afterChange: (current) => setSliderIndex(current),
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
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 2,
                },
            },
        ],
    };

    const dispatch = useDispatch();
    const { items, error, status } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (items && items.data && items.data.products) {
            setFilteredProducts(items.data.products);
        }
    }, [items, items.data]);

    const handleSliderChange = (e) => {
        const newIndex = Number(e.target.value);
        setSliderIndex(newIndex);
        slider.slickGoTo(newIndex);
    };

    useEffect(() => {
        const rangeSlider = document.querySelector('.custom-range-slider');
        if (rangeSlider) {
            const percentage = (sliderIndex / totalSlides) * 100;
            rangeSlider.style.setProperty('--value', `${percentage}%`);
        }
    }, [sliderIndex, totalSlides]);

    return (
        <div className=" mx-auto p-4 relative flex flex-col md:gap-4">
            {filteredProducts.length > 0 && (
                <Slider
                    ref={setSlider}
                    {...settings}
                    className="pb-8"
                >
                    {filteredProducts.map((card, index) => (
                        <div
                            key={index}
                            className="p-2"
                        >
                            <Card
                                product={card}
                                container={false}
                            />
                        </div>
                    ))}
                </Slider>
            )}
            {/* <div className=" w-5/6">
        <input
          type="range"
          min="0"
          max={totalSlides}
          value={sliderIndex}
          onChange={handleSliderChange}
          className="custom-range-slider w-full  rounded-lg appearance-none cursor-pointer"
        />
      </div> */}
        </div>
    );
};

export default CardContainer;
