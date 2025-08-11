import React, { useEffect, useState } from 'react';
// import container from "../../Assets/Container.png";
// import container2 from "../../Assets/Container.png";
// import container3 from "../../Assets/Card1.png";
import deliveryIcon from '../../Assets/delieveryIcon.svg';
import addToCartIcon from '../../Assets/addtocart.svg';
import buyNowIcon from '../../Assets/buynow.svg';
import productCard from '../../Assets/Container.png';

import { IoIosStar } from 'react-icons/io';
import CardContainer from '../Homepage/CardContainer';
import {
    Navigate,
    useNavigate,
    useParams,
    useLocation,
} from 'react-router-dom';

import ColorPickerPopup from './ColorPickerPopup';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProductDetails,
    fetchProducts,
    resetProductDetails,
} from '../../features/productSlice';
import {
    addItem,
    getcartItemList,
    deleteItem,
} from '../../features/CartCred/cartSlice';
import {
    addItemWishList,
    deleteItemWishList,
} from '../../features/CartCred/wishList';
import Loader1 from '../Loaders/Loader1';
import ReviewItem from './ReviewItem';
import express from '../../Assets/express.jpeg';
import wish1 from '../../Assets/wish1.svg';
import wish2 from '../../Assets/wish2.svg';
import { IMAGE_URL } from '../../Constants';
import useTitle from '../../useTitle';
const cards = [
    {
        image: productCard,
        offer: '20% OFF',
        caption: 'Product 1',
        rate: '$15.99',
        notOfferedPrice: '$19.99',
    },
    {
        image: productCard,
        offer: '10% OFF',
        caption: 'Product 2',
        rate: '$22.99',
        notOfferedPrice: '$24.99',
    },
    // Add more cards as needed
];

const ProductDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchResult, setSearchResult] = useState(null);
    const [selectedImage, setSelectedImage] = useState(undefined);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('auth-token'),
    );
    const dispatch = useDispatch();
    const { detail, detailError, detailStatus, Images } = useSelector(
        (state) => state.productDetails,
    );
    const { cartProducts, cartLaoding, error, cartStatus } = useSelector(
        (state) => state.cartItemlist,
    );
    const { cartItems, statusbar } = useSelector((state) => state.addcartItem);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [dealers, setDealers] = useState([]);
    const params = useParams();
    const id = params.id;

    const [cartData, setCartData] = useState({
        productId: '',
        dealerId: '',
        quantity: '',
    });

    useEffect(() => {
        dispatch(resetProductDetails());
        //console.log('!!id', id, detailStatus);
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);
    const addtocart = async () => {
        if (!isAuthenticated) {
            navigate('/signin', { state: { from: location.pathname } });
            return;
        }
        const data = {
            productId: searchResult?._id,
            dealerId: dealers[0]._id,
            quantity: 1,
        };
        //console.log('(((object', data);
        if (data.productId && data.dealerId && data.quantity) {
            await dispatch(addItem(data));
            const cartData = await dispatch(getcartItemList());
            // //console.log('**', cartData);
            navigate('/cart');
        } else {
            console.error('Missing cart data!');
        }
    };

    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch(getcartItemList());
        }
    }, [dispatch, cartStatus]);
    useEffect(() => {
        // //console.log('cartProducts: ', cartProducts);
        if (cartProducts && cartProducts?.data?.products) {
            const allCartProducts = cartProducts?.data?.products;
            //console.log('neallCartProducts: ', allCartProducts);
        }
    }, [
        dispatch,
        cartStatus,
        cartProducts?.data?.products?.quantity,
        cartProducts,
    ]);

    const handleDeleteItem = async (id) => {
        // setCartItems((prevItems) =>
        //     prevItems.filter((item) => item._id !== id),
        // );
        await dispatch(
            deleteItem({
                cartProductId: id,
            }),
        );
    };
    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            navigate('/signin', { state: { from: location.pathname } });
            return;
        }
        if (cartProducts?.data?.products?.length > 0) {
            // Wait for all delete actions to complete
            const deletionPromises = cartProducts.data.products.map((product) =>
                dispatch(deleteItem({ cartProductId: product._id })),
            );

            // Await the completion of all deletion promises
            await Promise.all(deletionPromises);
            //console.log('All items deleted from cart');
        }

        // Check if all items are deleted by verifying the cart is empty
        const updatedCart = await dispatch(getcartItemList()); // Refresh cart state after deletion
        //console.log('!!', updatedCart);
        const isCartEmpty = updatedCart.payload?.data?.products?.length === 0;

        if (isCartEmpty) {
            const data = {
                productId: searchResult?._id,
                dealerId: dealers[0]._id,
                quantity: 1,
            };
            if (data.productId && data.dealerId && data.quantity) {
                await dispatch(addItem(data));
                const cartData = await dispatch(getcartItemList());
                // //console.log('**', cartData);
                navigate('/cart/summary');
            } else {
                console.error('Missing cart data!');
            }
        } else {
            console.error(
                'Cart is not empty. Could not proceed to add new item.',
            );
        }
    };

    // const handleWishList = () => {
    //     setIsWished((prev) => !prev);
    //     const data = {
    //         productRef: searchResult?._id,
    //         action: 1,
    //     };
    //     //console.log('wishlist id: ', data);
    //     if (data.productRef && data.action) {
    //         dispatch(addItemWishList(data));
    //         // navigate('/cart');
    //     } else {
    //         console.error('Wishist error!');
    //     }
    // };
    const [isWished, setIsWished] = useState(
        searchResult?.isWishlisted || false,
    );

    useEffect(() => {
        setIsWished(searchResult?.isWishlisted || false);
    }, [searchResult]);
    const handleWishList = () => {
        setIsWished((prev) => {
            const newState = !prev;

            const data = {
                productRef: searchResult?._id,
                action: newState ? 1 : 2,
                // isWishlisted: newState === 1 ? true : false,
            };

            //console.log('!!!!!!!!!!!data.action: ', data.action);
            if (data.productRef && data.action !== undefined) {
                if (newState) {
                    dispatch(addItemWishList(data)); // Dispatch action to add item to wishlist
                } else {
                    dispatch(deleteItemWishList(data)); // Dispatch action to remove item from wishlist
                }
            } else {
                console.error('Wishlist error!');
            }

            return newState; // Return the new wished state
        });
    };

    // Fetch product details when `id` changes

    // Update searchResult when `detail` updates
    useEffect(() => {
        //console.log('detail: ', detail);
        //console.log('id: ', id);
        if (detail && detail.data && id) {
            const newdata = detail.data;
            //console.log('#newdata: ', newdata);
            setSearchResult(newdata);
            setDealers(newdata.dealer);
        }
    }, [detail, id]);

    // Separate useEffect to log or track changes to searchResult
    useEffect(() => {
        if (searchResult) {
            //console.log('Updated searchResult: ', searchResult);
            //console.log('Updated searchResult dealers: ', dealers);
            setSelectedImage(searchResult?.images[0]); // Optionally set the image
        }
    }, [searchResult, id]);

    // Update cartData when searchResult and detailStatus are available
    useEffect(() => {
        //console.log('search Result++: ', searchResult);
        if (detailStatus === 'succeeded' && searchResult?.dealer?._id) {
            setCartData({
                productId: id,
                dealerId: searchResult.dealer._id,
                quantity: 6,
            });
        }
    }, [detailStatus, searchResult, id]);

    //console.log('#Cart Data: ', cartData);

    //FIXME: builder
    const deliveryInfos = [
        {
            storeName: 'Manish Paints store',
            phoneNumber: '9865478965',
            address: '1/23B, Pillayar kovil street, Saidapet, Chennai,621806',
            isSelected: false,
        },
        {
            storeName: 'Manish Paints store',
            phoneNumber: '9865478965',
            address: '1/23B, Pillayar kovil street, Saidapet, Chennai,621806',
            isSelected: true,
        },
    ];

    const productFeatures = [
        {
            name: 'Purification',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c4af362965c7307dcc385082edcbe7557eb977089482ee5d642edb0a0241c730?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
        },
        {
            name: 'Taste & Odour',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e23ce1dfaee485cba54d678a12b963ae7c7f76e7292243420da808b91c9226ae?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
        },
        {
            name: 'Design & Features',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/328f93d33cf51468957885de75add1d04b680bb50d1fe96e6423fb27d116583c?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
        },
        {
            name: 'Capacity',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/420efba5c002d6d3ef25092326d8413a83c510554d961a1d15e74642f11f6913?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
        },
    ];
    const ratings = [
        { stars: 5, count: 10638, percentage: 100 },
        { stars: 4, count: 3067, percentage: 29 },
        { stars: 3, count: 1086, percentage: 10 },
        { stars: 2, count: 513, percentage: 0 },
        { stars: 1, count: 2467, percentage: 23 },
    ];
    useTitle(searchResult?.name);

    return (
        <>
            {detailStatus === 'loading' && <Loader1 />}
            {detailStatus === 'succeeded' ? (
                <div className="p-4 px-8 pt-24 mx-10 ml-0 ">
                    <div className="grid grid-cols-1 gap-8 md:flex">
                        {/* Left Side: Product Images */}
                        <div className="w-[40%]">
                            <div className="p-4 mb-4 bg-neutral-100 rounded-2xl">
                                <img
                                    // src={selectedImage}
                                    src={`${IMAGE_URL}${selectedImage}`}
                                    alt="Selected"
                                    className="object-cover w-full rounded-lg"
                                />
                            </div>
                            <div className="flex justify-center space-x-2">
                                {searchResult?.images.map((img, index) => (
                                    <img
                                        key={index}
                                        // src={img}
                                        src={`${IMAGE_URL}${img}`}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="object-cover w-20 h-20 rounded-lg cursor-pointer"
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Product Details */}
                        <div className="w-[60%] pr-6">
                            <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                                <span className="text-sm">
                                    Deliver by Monday July 22
                                </span>
                            </div>
                            <h1 className="mb-2 text-2xl font-semibold font-custom">
                                {searchResult?.name}
                            </h1>
                            {/* <p className="mb-4 text-gray-700">
                {searchResult?.shortDescription}
              </p> */}
                            <div className="flex items-center mb-4">
                                <IoIosStar className="text-sm text-orange-500" />
                                <IoIosStar className="text-sm text-orange-500" />
                                <IoIosStar className="text-sm text-orange-500" />
                                <IoIosStar className="text-sm text-orange-500" />
                                <IoIosStar className="text-sm text-orange-500" />
                                <span className="text-sm text-black font-custom ">
                                    {/* {searchResult?.rating} */}({' '}
                                    {searchResult?.ratingCount} Ratings )
                                </span>
                                <span className="ml-2 text-sm text-gray-600 font-custom">
                                    {/* ({searchResult?.ratingCount} Ratings) */}
                                </span>
                                <span className="ml-4">
                                    Warranty: {searchResult?.warranty} Year's
                                    {/* Warranty: {searchResult?.isWishlisted}{' '} */}
                                </span>
                                <div className="flex items-center justify-between flex-1 ml-7">
                                    <div className="flex items-center text-green-500">
                                        <img
                                            src={deliveryIcon}
                                            alt="Free Delivery"
                                            className="w-4 h-4 mr-1"
                                        />
                                        Free Delivery
                                    </div>
                                    <div
                                        onClick={handleWishList}
                                        className="cursor-pointer"
                                    >
                                        <img
                                            src={isWished ? wish2 : wish1}
                                            alt="Wishlist Icon"
                                            width="25"
                                            height="25"
                                        />
                                    </div>
                                </div>
                            </div>
                            {searchResult?.isExpress && (
                                <header className="flex flex-col max-w-[120px] text-xl text-white">
                                    <div className="relative flex flex-col px-2 py-1 aspect-[5.229]">
                                        <img
                                            loading="lazy"
                                            src={express}
                                            className="absolute inset-0 object-cover"
                                            alt=""
                                        />
                                    </div>
                                </header>
                            )}
                            <div className="mb-4 text-base font-normal text-zinc-500">
                                <span className="text-lg font-semibold">
                                    {/* {searchResult?.quantity}L */}
                                </span>
                            </div>
                            <div className="flex mt-4">
                                <span className="text-4xl font-semibold text-black">
                                    <span className="font-sans ">₹</span>
                                    {searchResult?.sellingPrice}
                                </span>
                                <div className="mt-2">
                                    <span className="ml-4 text-xl text-gray-500 line-through">
                                        <span className="font-sans">₹</span>
                                        {searchResult?.mrp}
                                    </span>
                                </div>
                                <div className="px-4 py-2 ml-6 font-bold text-green-600 border border-green-700 rounded-full bg-green-50 text-md">
                                    <span className="">
                                        {searchResult?.discountPercentage}% off
                                    </span>
                                </div>
                            </div>
                            <hr className="mt-4 mb-0"></hr>
                            <div className="flex items-center mb-4 md:gap-10">
                                {/* <span className="text-base text-zinc-600 font-custom ">
                  Color & Textures
                </span> */}
                                {/* <div className="flex ml-4 space-x-2">
              {product.colors.map((color, index) => (
                <div
                  key={index}
                  className={w-6 h-6 rounded-full bg-${color.toLowerCase()}-500}
                ></div>
              ))}
            </div>
            <div className="flex ml-4 space-x-2">
              {product.textures.map((texture, index) => (
                <button
                  key={index}
                  className="px-2 py-1 border border-gray-400 rounded-md"
                >
                  {texture}
                </button>
              ))}
            </div> */}
                                {/* <button
                  onClick={() => setIsPopupOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-black border rounded-full outline-none font-custom"
                >
                  Select Colour
                </button> */}
                            </div>
                            {/* <div className="mb-8">
                <span className="text-base text-zinc-600 font-custom">
                  Delivered By
                </span>
              </div> */}
                            {/* <div className="flex gap-2 mb-8">
                {searchResult?.dealer.map((sellers) => {
                  return (
                    <div
                      key={sellers.id}
                      className="relative flex flex-col flex-wrap gap-4 p-6 text-black border md:w-72 rounded-xl font-custom"
                    >
                      <p className="text-base font-medium">
                        {searchResult?.dealer.firstName}{" "}
                        {searchResult?.dealer.lastName}
                        {sellers.firstName} {sellers.lastName}
                      </p>
                      <p className="text-base font-medium">
                        {searchResult?.dealer.phoneNumber}
                      </p>
                      <p className="text-sm underline text-zinc-600">
                        {searchResult?.dealer.addressLine1}
                        {sellers.addressLine1}
                      </p>
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        className="absolute border border-green-500 rounded-lg outline-none top-2 right-2 accent-green-500"
                      />
                    </div>
                  );
                })}
              </div> */}
                            <div className="mb-7">
                                <div className="mt-5 font-bold text-md">
                                    <span>
                                        Category:{' '}
                                        <span className="text-gray-600">
                                            {searchResult?.group}
                                        </span>
                                    </span>
                                </div>
                                <div className="pt-4 ">
                                    <div className="overflow-x-auto w-80 font-custom">
                                        <table className="min-w-full border-none rounded-lg">
                                            <tbody>
                                                <tr className="">
                                                    <th className="px-4 py-2 text-left text-zinc-600">
                                                        Brand:
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        {searchResult?.brand}
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <th className="px-4 py-2 text-left text-zinc-600">
                                                        Colour:
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        {
                                                            searchResult
                                                                ?.colour[0]
                                                                ?.hexCode
                                                        }
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <th className="px-4 py-2 text-left text-zinc-600">
                                                        Storage Capacity:
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        {searchResult?.quantity}
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <th className="px-4 py-2 text-left text-zinc-600">
                                                        Technology
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        {/* {searchResult?.technology} */}
                                                    </td>
                                                </tr>
                                                <tr className="">
                                                    <th className="px-4 py-2 text-left text-zinc-600">
                                                        Material Type:
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        {
                                                            searchResult?.finishType
                                                        }
                                                    </td>
                                                </tr>

                                                {/* <tr className="">
                          <th className="px-4 py-2 text-left text-zinc-600 ">
                            Special Features
                          </th>
                          <td className="px-4 py-2">
                            {searchResult?.specialFeature}
                          </td>
                        </tr> */}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* <ul className="px-4 ml-6 list-disc font-custom">
                  {searchResult?.about.map((feature, index) => (
                    <li key={index} className="mb-4">
                      {feature}
                    </li>
                  ))}
                </ul> */}
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    className={`font-custom flex px-9 py-3 bg-[#A70024] text-white rounded-md text-sm font-semibold ${
                                        !dealers.length
                                            ? 'bg-red-500 cursor-not-allowed  text-gray-300 opacity-65'
                                            : 'hover:bg-red-800'
                                    }`}
                                    onClick={() => addtocart()}
                                    disabled={!dealers.length}
                                >
                                    <img
                                        src={buyNowIcon}
                                        alt=""
                                        className="pr-2"
                                    />
                                    ADD CART
                                </button>
                                <button
                                    className={`flex py-3 text-sm font-semibold text-white bg-orange-400 rounded-md font-custom px-9 ${
                                        !dealers.length
                                            ? 'bg-gray-300 cursor-not-allowed  text-gray-300 opacity-65'
                                            : 'hover:bg-orange-500'
                                    }`}
                                    disabled={!dealers.length}
                                    onClick={() => handleBuyNow()}
                                >
                                    <img
                                        src={addToCartIcon}
                                        alt=""
                                        className="pr-2"
                                    />
                                    BUY NOW
                                </button>
                            </div>
                            <div className="pt-4 ">
                                <h4 className="px-4 mt-4 mb-4 text-base font-bold text-zinc-700 font-custom">
                                    About
                                </h4>
                                <ul className="px-4 ml-6 list-disc font-custom">
                                    {searchResult?.about.map(
                                        (feature, index) => (
                                            <li
                                                key={index}
                                                className="mb-4"
                                            >
                                                {feature}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                            {/* //FIXME: Builder */}
                            <div className="flex flex-col w-full max-md:max-w-full">
                                <h2 className="self-start gap-6 text-base text-zinc-600">
                                    Delivered by
                                </h2>
                                {dealers.length === 0 ? (
                                    <p className="text-red-600">
                                        {' '}
                                        There are no dealers available in your
                                        area at the moment, but we'll be there
                                        soon!
                                    </p>
                                ) : (
                                    <div className="flex flex-wrap items-start w-full gap-4 mt-3 text-base font-medium text-zinc-900 max-md:max-w-full">
                                        {dealers?.map((info, index) => (
                                            <div className="flex relative flex-col w-[48%] shrink justify-center p-4 rounded-md min-w-[240px] bg-neutral-200 bg-opacity h-36">
                                                <h3 className="self-start gap-2">
                                                    {info.firstName}{' '}
                                                    {info.lastName}
                                                </h3>
                                                <p className="z-0 mt-2 uppercase">
                                                    {info.phoneNumber}
                                                </p>
                                                <p className="w-full gap-2 mt-2 text-sm leading-5 text-zinc-600">
                                                    {info.addressLine1},{' '}
                                                    {info.city}, {info.state},
                                                    {
                                                        info
                                                            .dealerServiceLocations[0]
                                                            .pincode
                                                    }
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-2 p-4 mt-4 border-t-2 font-custom border-neautral-200">
                        <p className="text-4xl font-semibold text-black">
                            Customers who viewed this item also viewed
                        </p>
                        <p className="text-xl text-zinc-600">
                            Grab your favorite colors at amazing discounts!
                        </p>
                    </div>
                    <div class="items-slider min-h-fit w-full">
                        <CardContainer cards={cards} />
                    </div>

                    {isPopupOpen && (
                        <ColorPickerPopup
                            onClose={() => setIsPopupOpen(false)}
                        />
                    )}
                </div>
            ) : (
                <Loader1 />
            )}
        </>
    );
};

export default ProductDetail;

//FIXME: searchResult?.dealer.map((sellers))
{
    /* <div className="p-4 border rounded-lg">
              <h3 className="mb-2 text-lg font-bold">Seller Information</h3>
              <p>Name: {product.seller.name}</p>
              <p>Contact: {product.seller.contact}</p>
              <p>Address: {product.seller.address}</p>
              <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg">
                Choose Seller
              </button>
            </div> */
}
