import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import Loader1 from "../Loaders/Loader1";
import { NextArrow, PrevArrow } from "./CustomArrows";

const settings2 = {
  // dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  rows: 2,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  // arrows: true,
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

const categories = [
  "Interior Paints",
  "Exterior Paints",
  "Enamels",
  "Wall Putty",
  "Wood Polish",
  "Water Proofing",
  "Tools and Accessories",
];

const categoryMappings = {
  "Interior Paints": "Interior",
  "Exterior Paints": "Exterior",
  Enamels: "Enamel",
  "Wall Putty": "Wall Putty",
  "Wood Polish": "Wood Polish",
  "Water Proofing": "Water Proofing",
  "Tools and Accessories": "Tools and Accessories",
};

const FilterProducthomepage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const { items, error, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (items && items.data && items.data.products) {
      setLoader(true);
      const filteredProducts = items.data.products.filter((product) =>
        selectedCategory
          ? product.group === categoryMappings[selectedCategory]
          : true
      );
      setFilteredProducts(filteredProducts);
      setLoader(false);
    }
  }, [items, items.data, selectedCategory]);

  return (
    <>
      <div className="hidden md:block bg-gray-800 text-white rounded-md p-4 w-full max-w-full mx-auto my-4 font-custom">
        <div className="flex justify-between">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-200 cursor-pointer ${
                selectedCategory === item ? "bg-green-600" : ""
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* <div className="products"> */}
      {/* {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.shortDescription}</p>
              <img src={product.images[0]} alt={product.name} />
              <p>Price: {product.sellingPrice}</p>
              {/* Add more product details as needed */}
      {/* </div> */}
      {/* )) */}
      {/* ) : ( */}
      {/* <p>No products found.</p> */}
      {/* )}  */}
      {/* */}
      {/* </div> */}
      <div className="mx-4 my-8 w-full  bg-neutral-200/40 border border-zinc-400/15 rounded-xl p-2">
        {/* {( loader == true) && (
          <div className="w-full flex items-center justify-center">
            {" "}
            <Loader1 />
          </div>
        )} */}

        {/* {status === "failed" && <p>Error: {error}</p>}
        {!loader ?
        (  <Slider
            {...settings2}
            key={`${selectedCategory}-${filteredProducts.length}`}
          >
            {status === "succeeded" &&
              filteredProducts.map((product, index) => (
                <div key={index} className="w-1/4 p-4">
                  <Card product={product} container={true} />
                </div>
              ))}
          </Slider>):<Loader1/>
        } */}

        {status === "loading" || loader ? (
          <div className="w-full flex items-center justify-center">
            <Loader1 />
          </div>
        ) : (
          <>
            {status === "succeeded" && filteredProducts.length === 0 && (
              <p>No products available for this category.</p>
            )}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && filteredProducts.length > 0 && (
              <Slider
                {...settings2}
                key={`${selectedCategory}-${filteredProducts.length}`}
              >
                {filteredProducts.map((product, index) => (
                  <div key={index} className="w-1/4 p-4">
                    <Card product={product} container={true} />
                  </div>
                ))}
              </Slider>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FilterProducthomepage;
