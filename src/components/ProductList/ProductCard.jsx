import React from 'react';
import deliveryIcon from '..//..//Assets/delieveryIcon.svg';
import { IoIosStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import express from '../../Assets/express.jpeg';
import { IMAGE_URL } from '../../Constants';

const ProductCard = ({ product }) => {
    // //console.log('++', product);
    return (
        <Link
            to={`/products/${product._id}`}
            // target="_blank"
            rel="noopener noreferrer"
        >
            <div className="bg-white flex w-full h-64 md:h-64 lg:h-auto p-4  border-gray-200  mb-6 shadow-[0_-5px_10px_rgba(0,0,0,0.1),_0_5px_10px_rgba(0,0,0,0.1)]">
                {/* Left: Product Image */}
                <div className="flex-shrink-0 w-1/3">
                    <img
                        // src={product?.images[0]}
                        src={`${IMAGE_URL}${product?.images[0]}`}
                        alt={product.name}
                        className="object-cover w-full h-full p-6 rounded-md"
                    />
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col justify-between w-2/3">
                    {/* Product Info */}
                    <div>
                        <div className="flex items-center justify-between mb-2"></div>

                        <div className="flex items-center justify-between mb-0 text-sm text-gray-600">
                            <span className="text-sm">
                                Deliver by Monday July 22
                            </span>
                            <div className="flex items-center text-green-500 text-md">
                                <img
                                    src={deliveryIcon}
                                    alt="Free Delivery"
                                    className="w-4 h-4 mr-1"
                                />
                                Free Delivery
                            </div>
                        </div>
                        <p className="mt-3 mb-1 text-2xl font-bold text-zinc-900 ">
                            {product?.name?.length > 90
                                ? product?.name?.slice(0, 90) + `...`
                                : product?.name}
                        </p>
                        <div className="flex items-center">
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <span className="py-1 pl-2 text-sm font-semibold text-black">
                                {product?.rating}
                            </span>
                            <span className="text-xs text-gray-600">
                                ( {product?.ratingCount} Ratings )
                            </span>
                            <span className="ml-4">
                                Warranty: {product?.warranty} Year's
                            </span>
                        </div>
                        {product?.isExpress && (
                            <header className="flex flex-col max-w-[120px] text-xl text-white">
                                <div className="relative flex flex-col px-2 mt-2 py-1 aspect-[5.229]">
                                    <img
                                        loading="lazy"
                                        src={express}
                                        className="absolute inset-0 object-cover"
                                        alt=""
                                    />
                                </div>
                            </header>
                        )}

                        <div className="flex mt-4">
                            <span className="text-4xl font-semibold text-black">
                                <span className="font-sans ">₹</span>
                                {product?.sellingPrice}
                            </span>
                            <div className="mt-2">
                                <span className="ml-4 text-xl text-gray-500 line-through">
                                    <span className="font-sans">₹</span>
                                    {product.mrp}
                                </span>
                            </div>
                            <div className="px-4 py-2 ml-6 font-bold text-green-600 border border-green-700 rounded-full bg-green-50 text-md">
                                <span className="">
                                    {product?.discountPercentage}% off
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="mt-5 mb-3 font-bold text-md">
                                <span>Category: {product?.category}</span>
                            </div>
                            <div className="flex flex-col">
                                <span>Brand: {product?.brand}</span>
                                <span>
                                    Color: {product?.colour[0]?.hexCode}
                                </span>
                                <span>
                                    Storage Capacity: {product?.weight}L
                                </span>
                                <span>Technology: {product?.technology}</span>
                                <span>
                                    Material Type: {product?.finishType}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-4 text-right ">
                        <Link
                            to={`/products/${product._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#A70024] text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
