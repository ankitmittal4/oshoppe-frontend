import React, { useEffect, useState } from 'react';
import deliveryIcon from '..//../Assets/delieveryIcon.svg';
import container from '..//../Assets/Container.png';
import { useDispatch, useSelector } from 'react-redux';
import {
    getcartItemList,
    updateItemQuantity,
} from '../../features/CartCred/cartSlice';
import Loader1 from '../Loaders/Loader1';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const { cartProducts, cartLaoding, error, cartStatus } = useSelector(
        (state) => state.cartItemlist,
    );
    const { updatedData, quantityStatus } = useSelector(
        (state) => state.updateCartItem,
    );

    // useEffect(() => {
    //   if (quantityStatus === "idle") {
    //     updateItemQuantity({
    //       cartProductId: "66a690101b6717e65d73c883",
    //       quantity: 14,
    //     });
    //   }
    // }, [quantityStatus]);

    // //console.log(updatedData);

    const customer = {
        name: 'John Doe',
        pincode: '123456',
        address: '123 Main St, City, Country',
    };

    const handleQuantityChange = (id, delta) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item._id === id) {
                    const newQuantity = item.quantity + delta;
                    if (newQuantity >= 1) {
                        dispatch(
                            updateItemQuantity({
                                cartProductId: id,
                                quantity: newQuantity,
                            }),
                        );
                        return { ...item, quantity: newQuantity };
                    }
                }
                return item;
            }),
        );
    };

    // const handlePlusMius = (item, delta) => {
    //   if (item.quantity > 0) {
    //     handleQuantityChange(item.id, delta);
    //   }
    //   return;
    // };

    const calculateTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item?.sellingPrice * item?.quantity,
            0,
        );
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    {
        /*searching the particular item for cart with id */
    }

    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch(getcartItemList());
        }
    }, [dispatch, cartStatus]);

    // //console.log(cartStatus);

    useEffect(() => {
        if (cartProducts && cartProducts?.data?.products) {
            const newdata = cartProducts?.data?.products;
            setCartItems(newdata);

            const newImages = newdata.map((item) => item.images?.[0]);
            // setImage(newImages);

            // //console.log(image);
        }
    }, [dispatch, cartStatus, cartProducts?.data?.products?.quantity]);

    // useEffect(() => {
    //   if (cartProducts && cartProducts?.data?.products?.images) {
    //     const newdata = cartProducts?.data?.products;

    //     setImage(newdata?.images[0]);
    //   }
    // }, [dispatch, cartStatus]);
    //console.log('cartItems: ', cartItems);

    return (
        <>
            {cartStatus === 'succeeded' ? (
                <div className="flex flex-col p-4 pt-24 lg:flex-row lg:justify-between bg-gray-10">
                    <div className="w-full lg:w-3/4">
                        <div className="flex items-center justify-between px-4 py-2 mb-4 rounded-full bg-zinc-300/40 font-custom">
                            <span>
                                Deliver to {customer.name} - {customer.pincode}
                            </span>
                            <button className="px-3 py-2 text-white bg-green-500 rounded-full">
                                CHANGE
                            </button>
                        </div>

                        {cartItems.map((item) => (
                            <div
                                key={item?._id}
                                className="p-4 mb-4 bg-white rounded-lg shadow-md"
                            >
                                <div className="flex">
                                    <div className="w-2/5 md:w-1/4 md:p-6">
                                        <img
                                            // src={item?.images[0]}
                                            alt={item?.name}
                                            className="w-full rounded-lg"
                                        />
                                        <div className="flex items-center justify-center h-full space-x-4 md:mt-2 md:h-auto ">
                                            <button
                                                onClick={() => {
                                                    handleQuantityChange(
                                                        item?._id,
                                                        -1,
                                                    );
                                                }}
                                                className="px-3 py-1 rounded-full bg-zinc-200 text-zinc-600"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => {
                                                    handleQuantityChange(
                                                        item?._id,
                                                        1,
                                                    );
                                                }}
                                                className="px-3 py-1 text-white bg-green-500 rounded-full"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-3/4 pl-4 font-custom md:p-4">
                                        <h3 className="text-xl font-semibold">
                                            {item?.name}
                                        </h3>
                                        <table className="w-full mt-2 mb-4 text-left table-auto text-zinc-600 md:w-96 ">
                                            <tbody>
                                                <tr>
                                                    <td className="pr-4 font-semibold">
                                                        Brand
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pr-4 font-semibold">
                                                        Color
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pr-4 font-semibold">
                                                        Finish Type
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pr-4 font-semibold">
                                                        Size
                                                    </td>
                                                    <td>{item.quantity}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="flex items-center md:justify-between">
                                            <div className="flex md:gap-0 ">
                                                <p className="text-base text-red-600 line-through ">
                                                    ₹{item.mrp}
                                                </p>
                                                <p className="ml-6 text-2xl font-semibold text-zinc-600"></p>
                                            </div>
                                            <span className="hidden px-2 py-1 text-sm font-bold border rounded-full md:block border-amber-400 bg-amber-50 text-amber-400">
                                                {item.discountPercentage}% off
                                            </span>
                                        </div>
                                        <div className="flex flex-col mt-2 md:justify-between md:items-center md:flex-row">
                                            <p className="text-sm text-gray-600">
                                                Delivered By:
                                            </p>
                                            <div className="flex items-center text-green-500">
                                                <img
                                                    src={deliveryIcon}
                                                    alt="Free Delivery"
                                                    className="w-4 h-4 mr-1"
                                                />
                                                Free Delivery
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full mt-4 space-y-4 lg:w-1/4 lg:mt-0 lg:ml-4 font-custom">
                        <div className="p-6 space-y-3 rounded-lg shadow-md bg-zinc-300/40">
                            <h3 className="pb-2 mb-4 text-lg border-b-2 text-zinc-600 border-zinc-300">
                                PRICE DETAILS
                            </h3>
                            <div className="flex justify-between mb-2 text-base">
                                <span className="text-zinc-600">
                                    Price ({calculateTotalItems()} items)
                                </span>
                                <span className="text-xl font-semibold text-zinc-600">
                                    ₹{calculateTotalPrice()}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2 text-sm">
                                <span className="text-zinc-600">Discount</span>
                                <span className="text-xl font-medium text-green-600">
                                    - ₹{calculateTotalItems() * 500}
                                </span>{' '}
                                {/* Example discount calculation */}
                            </div>
                            <div className="flex justify-between pb-2 mb-2 text-sm border-b-2 border-zinc-300">
                                <span className="text-zinc-600 ">
                                    Delivery Charges
                                </span>
                                <span className="text-xl font-medium text-green-600">
                                    Free
                                </span>
                            </div>
                            <div className="flex justify-between mb-4 text-xl font-semibold text-zinc-600">
                                <span>TOTAL AMOUNT</span>
                                <span>
                                    ₹
                                    {calculateTotalPrice() -
                                        calculateTotalItems() * 500}
                                </span>
                            </div>
                        </div>
                        <button className="w-full py-3 text-xl font-semibold text-white bg-orange-400 rounded-full ">
                            PROCEED TO PAY
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-96">
                    <Loader1 />
                </div>
            )}
        </>
    );
};

export default Cart;
