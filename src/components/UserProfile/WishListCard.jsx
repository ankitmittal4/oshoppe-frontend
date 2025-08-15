import React from 'react';
import deliveryIcon from '..//..//Assets/delieveryIcon.svg';
import { IoIosStar } from 'react-icons/io';
import { Link } from 'react-router-dom';
import express from '../../Assets/express.jpeg';
import delete1 from '../../Assets/delete.svg';
import { deleteItemWishList } from '../../features/CartCred/wishList';
import { useDispatch } from 'react-redux';
import { IMAGE_URL } from '../../Constants';
const WishListCard = ({ product, refetchWishlist }) => {
    const dispatch = useDispatch();
    // //console.log('++', product);
    const handleDeleteWishItem = () => {
        const data = {
            productRef: product?._id,
            action: 2,
        };
        //console.log('wishlist delete id: ', data);
        if (data.productRef && data.action) {
            dispatch(deleteItemWishList(data)).then(() => {
                refetchWishlist(); // Call refetch function after deletion
            });
        } else {
            console.error('Wishist error!');
        }
    };
    return (
        <Link
            to={`/products/${product._id}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="bg-white flex w-full h-44 sm:h-44 md:h-48 lg:h-44 p-4 border-gray-200 mb-6 shadow-[0_-5px_10px_rgba(0,0,0,0.1),_0_5px_10px_rgba(0,0,0,0.1)]">
                {/* Left: Product Image */}
                <div className="flex sm:justify-center flex-shrink-0 lg:w-[15%] md:w-[15%] sm:w-[15%] w-[45%]">
                    <img
                        // src={product?.images[0]}
                        src={`${IMAGE_URL}${product?.images[0]}`}
                        alt={product.name}
                        className="object-cover rounded-md h-36 "
                    />
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col justify-between w-full ml-5">
                    {/* Product Info */}
                    <div>
                        <div className="flex justify-between">
                            <p className="mt-1 mb-1 sm:text-lg text-base font-bold text-zinc-900">
                                {product.name.length > 65
                                    ? product.name.slice(0, 65) + `...`
                                    : product.name}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDeleteWishItem(product._id);
                                }}
                                className="text-red-500"
                            >
                                <img
                                    src={delete1}
                                    alt=""
                                    className="w-10 h-8"
                                />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <IoIosStar className="text-lg text-orange-500" />
                            <span className="py-1 pl-2 text-sm font-semibold text-black">
                                {product?.rating}
                            </span>
                            <span className="text-xs text-gray-600 hidden sm:block">
                                ( {product?.ratingCount} Ratings )
                            </span>
                            <span className="ml-4 hidden sm:block">
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
                            <span className="text-2xl font-semibold text-black">
                                <span className="font-sans ">₹</span>
                                {product?.sellingPrice}
                            </span>
                            <div className="mt-1">
                                <span className="ml-2 text-lg text-gray-500 line-through">
                                    <span className="font-sans">₹</span>
                                    {product.mrp}
                                </span>
                            </div>
                            <div className="px-4 py-2 ml-6 font-bold text-green-600 border border-green-700 rounded-full bg-green-50 text-md hidden sm:block">
                                <span className="">
                                    {product?.discountPercentage?.toFixed(2)}%
                                    off
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default WishListCard;
