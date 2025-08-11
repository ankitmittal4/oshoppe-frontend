import React, { useEffect, useState } from 'react';
import deliveryIcon from '..//../Assets/delieveryIcon.svg';
import container from '..//../Assets/Container.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    getcartItemList,
    updateItemQuantity,
    deleteItem,
} from '../../features/CartCred/cartSlice';
import Loader1 from '../Loaders/Loader1';
import { IMAGE_URL } from '../../Constants';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [image, setImage] = useState();
    const dispatch = useDispatch();
    const { cartProducts, cartLaoding, error, cartStatus } = useSelector(
        (state) => state.cartItemlist,
    );
    const { updatedData, quantityStatus } = useSelector(
        (state) => state.updateCartItem,
    );

    const checkOut = () => {
        navigate('/cart/summary');
    };
    // useEffect(() => {
    //   if (quantityStatus === "idle") {
    //     updateItemQuantity({
    //       cartProductId: "66a690101b6717e65d73c883",
    //       quantity: 14,
    //     });
    //   }
    // }, [quantityStatus]);

    // //console.log(updatedData);

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

    const handleDeleteItem = (id) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item._id !== id),
        );
        dispatch(
            deleteItem({
                cartProductId: id,
            }),
        );
    };

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
            setTimeout(() => {
                dispatch(getcartItemList());
            }, 80);
            // dispatch(getcartItemList());
        }
    }, [dispatch, cartStatus]);

    // //console.log(cartStatus);

    useEffect(() => {
        //console.log('cartProducts: ', cartProducts);
        setTimeout(() => {}, 3000);
        if (cartProducts && cartProducts?.data?.products) {
            const newdata = cartProducts?.data?.products;
            //console.log('newdata: ', newdata);
            setCartItems(newdata);

            const newImages = newdata.map((item) => item.images?.[0]);
            // setImage(newImages);

            // //console.log(image);
        }
    }, [
        dispatch,
        cartStatus,
        cartProducts?.data?.products?.quantity,
        cartProducts,
    ]);
    const handleContinueShopping = () => {
        navigate('/');
    };

    // useEffect(() => {
    //   if (cartProducts && cartProducts?.data?.products?.images) {
    //     const newdata = cartProducts?.data?.products;

    //     setImage(newdata?.images[0]);
    //   }
    // }, [dispatch, cartStatus]);
    //console.log('cartItems: ', cartItems);

    const steps = [1, 2, 3];
    const labels = ['Address', 'Summary', 'Payment'];
    const currentStep = 1;

    return (
        <>
            <h1 className="mt-4 text-3xl font-bold text-center">
                My Shopping Cart
            </h1>
            {cartStatus === 'succeeded' ? (
                <div className="flex flex-col p-4 pt-14 lg:flex-row lg:justify-between bg-gray-10">
                    <div className="w-full lg:w-3/4">
                        <div className="flex items-center justify-between px-4 py-2 mb-4 ml-16 rounded-full font-custom">
                            <section className="flex flex-col whitespace-nowrap max-w-[849px]">
                                <div className="flex flex-wrap gap-2.5 justify-center items-center self-center w-full text-2xl text-white max-w-[824px] min-h-[47px] max-md:max-w-full">
                                    {steps.map((step, index) => (
                                        <React.Fragment key={index}>
                                            <div
                                                className={`flex items-center justify-center self-stretch px-5 my-auto rounded-lg h-[47px] rotate-[1.6081230200044232e-16rad] w-[47px] ${
                                                    index < currentStep
                                                        ? 'bg-[#A70024]'
                                                        : 'bg-zinc-400'
                                                }`}
                                            >
                                                <span>{step}</span>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div
                                                    className={`flex grow shrink self-stretch my-auto h-1 rounded-xl min-w-[240px] w-[314px] ${
                                                        index < currentStep
                                                            ? 'bg-[#A70024]'
                                                            : 'bg-zinc-400'
                                                    }`}
                                                />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                                {/* <ProgressLabels labels={labels} /> */}
                                <div className="flex flex-wrap gap-5 justify-between mt-1.5 w-full text-lg text-center text-zinc-900 max-md:max-w-full">
                                    {labels.map((label, index) => (
                                        <div key={index}>{label}</div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <section className="flex relative flex-col items-center pt-2.5 pb-20 bg-white rounded-lg border border-solid border-zinc-400 max-w-[852px] ml-16">
                            <header className="z-0 w-full text-xl text-black rounded-none">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-zinc-400">
                                            <th className="px-4 py-2">
                                                Product
                                            </th>
                                            <th className="px-4 py-2">Price</th>
                                            <th className="px-4 py-2">
                                                Quantity
                                            </th>
                                            <th className="px-4 py-2">
                                                Subtotal
                                            </th>
                                            <th className="px-4 py-2"></th>{' '}
                                            {/* Empty column for remove button */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((product) => (
                                            <tr
                                                key={product._id}
                                                className="border-b border-zinc-400"
                                            >
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            loading="lazy"
                                                            // src={
                                                            //     product
                                                            //         .images[0]
                                                            // }
                                                            src={`${IMAGE_URL}${product?.images[0]}`}
                                                            alt={product.name}
                                                            className="object-contain w-[60px] h-[60px]"
                                                        />
                                                        <span>
                                                            {product.name
                                                                .length > 15
                                                                ? product.name.slice(
                                                                      0,
                                                                      15,
                                                                  )
                                                                : product.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    ₹{product.sellingPrice}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => {
                                                                handleQuantityChange(
                                                                    product?._id,
                                                                    -1,
                                                                );
                                                            }}
                                                            className="px-3 py-1 rounded-full bg-zinc-200 text-zinc-600"
                                                            disabled={
                                                                product.quantity <=
                                                                1
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3">
                                                            {product.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                handleQuantityChange(
                                                                    product?._id,
                                                                    1,
                                                                );
                                                            }}
                                                            className="px-3 py-1 rounded-full bg-zinc-200 text-zinc-600"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    ₹
                                                    {product.sellingPrice *
                                                        product.quantity}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <button
                                                        aria-label="Remove item"
                                                        className="flex items-center px-3 py-3 rounded-md bg-rose-800"
                                                        onClick={() => {
                                                            handleDeleteItem(
                                                                product._id,
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9f633674f0df01065322a67dea6b7c57ce5836d66a0a7508860d670e95e0354?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                                            alt="Remove"
                                                            className="w-4"
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </header>
                            <button
                                className="absolute bottom-3.5 self-start px-4 py-2 max-w-full text-xl text-white bg-rose-800 rounded-md  right-[18px]  max-md:px-5"
                                onClick={handleContinueShopping}
                            >
                                Continue Shopping
                            </button>
                        </section>
                    </div>
                    <div className="w-full mt-4 space-y-4 lg:w-1/4 lg:mt-0 lg:ml-4 font-custom">
                        <section className="flex flex-col px-6 pt-3.5 pb-20 text-xl bg-white rounded-lg border border-solid border-neutral-200 max-w-[404px]">
                            <h2 className="text-zinc-900">Cart Total</h2>
                            <div className="flex flex-col w-full h-40 mt-8">
                                <div
                                    className={`flex gap-10 justify-between items-center py-3 w-full whitespace-nowrap bg-white`}
                                >
                                    <span className="text-zinc-600">
                                        SubTotal ({calculateTotalItems()} items)
                                    </span>
                                    <span className="text-xl font-semibold text-zinc-600">
                                        <span className="font-sans">₹</span>
                                        {calculateTotalPrice()}
                                    </span>
                                </div>
                                <div
                                    className={`flex gap-10 justify-between items-center py-3 w-full whitespace-nowrap bg-white`}
                                >
                                    <div className="self-stretch my-auto text-neutral-600">
                                        Shipping
                                    </div>
                                    <div className="self-stretch my-auto text-zinc-900">
                                        <span className="font-sans">₹</span>0
                                    </div>
                                </div>
                                <div
                                    className={`flex gap-10 justify-between items-center py-3 w-full whitespace-nowrap bg-white`}
                                >
                                    <div className="self-stretch my-auto text-neutral-600">
                                        Total
                                    </div>
                                    <span>
                                        <span className="font-sans">₹</span>
                                        {calculateTotalPrice() + 0}
                                    </span>
                                </div>
                                <button
                                    className={`flex gap-2.5 justify-center items-center px-6 py-2.5 w-full bg-[#A70024] rounded-md mt-3 ${
                                        cartItems.length === 0
                                            ? 'cursor-not-allowed opacity-65'
                                            : ''
                                    }`}
                                    onClick={checkOut}
                                    disabled={cartItems.length === 0}
                                >
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0356f9899a54905a5151d259c2fd51a100e96a5bb2fe3c491ead985780307a0?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                        className="self-stretch object-contain my-auto shrink-0 w-7 aspect-square"
                                        alt=""
                                    />
                                    <span className="self-stretch my-auto text-white text-md">
                                        Check Out
                                    </span>
                                </button>
                            </div>
                        </section>
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

{
    /* <div className="p-6 space-y-3 rounded-lg shadow-md bg-zinc-300/40">
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
                </span>{" "}
              </div>
              <div className="flex justify-between pb-2 mb-2 text-sm border-b-2 border-zinc-300">
                <span className="text-zinc-600 ">Delivery Charges</span>
                <span className="text-xl font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between mb-4 text-xl font-semibold text-zinc-600">
                <span>TOTAL AMOUNT</span>
                <span>
                  ₹{calculateTotalPrice() - calculateTotalItems() * 500}
                </span>
              </div>
            </div>
            <button className="w-full py-3 text-xl font-semibold text-white bg-orange-400 rounded-full ">
              PROCEED TO PAY
            </button> */
}
