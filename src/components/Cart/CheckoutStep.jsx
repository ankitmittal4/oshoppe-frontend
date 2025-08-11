import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getcartItemList } from '../../features/CartCred/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listAddresses } from '../../features/addressSlice';
import { API_URL, IMAGE_URL } from '../../Constants';

const InputField = ({ placeholder, type }) => (
    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
        <div className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px]">
            <input
                type={type}
                name="pincode"
                placeholder={placeholder}
                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
            />
        </div>
    </div>
);
const CheckoutStep = ({
    number,
    title,
    isActive,
    isExpanded,
    details,
    onToggle,
}) => {
    // Text color and background logic based on expanded status
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const textColor = isExpanded ? 'text-white' : 'text-black';
    const bgColor = isExpanded ? 'bg-red-800' : 'bg-zinc-300';
    const [loginDetails, setLoginDetails] = useState(null);
    const [addressDetails, setAddressDetails] = useState(null);
    const { cartProducts, cartLaoding, error, cartStatus } = useSelector(
        (state) => state.cartItemlist,
    );
    const [loading, setLoading] = useState(true);
    const { addresses, isLoading } = useSelector((state) => state.address);
    const [defaultAddress, setDefaultAddress] = useState([]);
    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch(getcartItemList());
        }
    }, [dispatch, cartStatus]);
    useEffect(() => {
        //console.log('@@@cartProducts: ', cartProducts);
        // setTimeout(() => {
        if (cartProducts?.data?.products) {
            const newdata = cartProducts?.data?.products;
            //console.log('!!newdata: ', newdata);
            setCartItems(newdata);
            setLoading(false);
        }
        // }, 3000);
    }, [
        dispatch,
        cartStatus,
        cartProducts?.data?.products?.quantity,
        cartProducts,
    ]);
    useEffect(() => {
        if (addresses && addresses.length > 0) {
            const filterAddress = addresses.filter(
                (address) => address.isDefault === true,
            );
            setDefaultAddress(filterAddress);
        }
    }, [addresses]);

    useEffect(() => {
        const fetchLoginDetails = async () => {
            try {
                let headers = {
                    Authorization: `Bearer ${localStorage.getItem(
                        'auth-token',
                    )}`,
                };
                let reqOptions = {
                    url: `${API_URL}/customer/detail`,
                    method: 'GET',
                    headers: headers,
                };
                let response = await axios.request(reqOptions);
                //console.log('loginDetails: ', response.data.data);

                setLoginDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching login details:', error);
            }
        };
        const fetchAddressDetails = async () => {
            try {
                let headers = {
                    Authorization: `Bearer ${localStorage.getItem(
                        'auth-token',
                    )}`,
                };
                let reqOptions = {
                    url: `${API_URL}/address/list`,
                    method: 'POST',
                    headers: headers,
                };
                let response = await axios.request(reqOptions);
                //console.log('Address details: ', response.data);
                // //console.log('Address details: ', response.data.data.address[0]);

                setAddressDetails(response.data.data.address[0]);
            } catch (error) {
                console.error('Error fetching address details:', error);
            }
        };

        fetchLoginDetails();
        fetchAddressDetails();
    }, []);
    // const handlePayment = async () => {
    //     window.open(paymentLink, '_blank');
    // };

    const handleContinueShopping = () => {
        navigate('/');
    };

    const handlePayment = async () => {
        try {
            let headers = {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            };
            let reqOptions = {
                url: `${API_URL}/customer/order/create`,
                method: 'POST',
                headers: headers,
            };
            let response = await axios.request(reqOptions);
            //console.log('Payment details: ', response.data);
            window.open(response.data.data, '_blank');
        } catch (error) {
            console.error('Error in payment step:', error);
        }
    };
    //Address form

    // if (loading === true) {
    //     return (
    //         <>
    //             <h1>Loaind.....</h1>
    //         </>
    //     );
    // }
    return (
        <div className="flex flex-col w-full">
            <div
                className={`flex items-center gap-6 ${bgColor} h-16 rounded-md`}
                onClick={onToggle}
            >
                <div
                    className={`ml-6 self-stretch px-2.5 my-auto text-lg whitespace-nowrap rounded-md ${textColor} h-[30px] w-[30px] font-semibold`}
                >
                    {number}
                </div>
                <div
                    className={`self-stretch my-auto text-xl text-center ${textColor} uppercase font-semibold`}
                >
                    {title}
                </div>
            </div>

            {/* Conditional rendering of the dropdown */}
            {isExpanded && (
                <div
                    className="p-4 pt-3 bg-gray-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {number === 1 && (
                        <>
                            <p>
                                Name: {loginDetails?.firstName}{' '}
                                {loginDetails?.lastName}
                            </p>
                            <p>Phone: {loginDetails?.phoneNumber}</p>
                        </>
                    )}
                    {number === 2 && (
                        <>
                            {defaultAddress ? (
                                <div className="w-2/3 p-3 mb-2 rounded-md">
                                    <p>
                                        <strong>Address:</strong>{' '}
                                        {defaultAddress[0]?.address}
                                    </p>
                                    <p>
                                        <strong>City:</strong>{' '}
                                        {defaultAddress[0]?.city}
                                    </p>
                                    <p>
                                        <strong>State:</strong>{' '}
                                        {defaultAddress[0]?.state}
                                    </p>
                                    <p>
                                        <strong>Landmark:</strong>{' '}
                                        {defaultAddress[0]?.landmark}
                                    </p>
                                    <p>
                                        <strong>Pincode:</strong>{' '}
                                        {defaultAddress[0]?.pincode}
                                    </p>
                                    <p>
                                        <strong>Type:</strong>{' '}
                                        {defaultAddress[0]?.addressType}
                                    </p>
                                </div>
                            ) : (
                                <>No Address Found</>
                            )}
                        </>
                    )}
                    {number === 3 && (
                        <>
                            <section className="flex relative flex-col items-center pt-2.5 pb-2  rounded-lg  max-w-full">
                                <header className="z-0 w-full text-xl text-black rounded-none">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-zinc-400">
                                                <th className="px-4 py-2">
                                                    Product
                                                </th>
                                                <th className="px-4 py-2">
                                                    Price
                                                </th>
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
                                            {loading ? (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center py-4"
                                                    >
                                                        <h1>Loading....</h1>
                                                    </td>
                                                </tr>
                                            ) : (
                                                cartItems.map((product) => (
                                                    <tr
                                                        key={product._id}
                                                        className="border-b border-zinc-400"
                                                    >
                                                        <td className="px-4 py-2">
                                                            <div className="flex items-center gap-3">
                                                                <img
                                                                    loading="lazy"
                                                                    src={`${IMAGE_URL}${product?.images[0]}`}
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="object-contain w-[60px] h-[60px]"
                                                                />
                                                                <span>
                                                                    {product
                                                                        .name
                                                                        .length >
                                                                    15
                                                                        ? product.name.slice(
                                                                              0,
                                                                              15,
                                                                          )
                                                                        : product.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            ₹
                                                            {
                                                                product.sellingPrice
                                                            }
                                                        </td>
                                                        <td className="py-2 px-7">
                                                            <div className="flex items-center">
                                                                <span className="px-3">
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            ₹
                                                            {product.sellingPrice *
                                                                product.quantity}
                                                        </td>
                                                        {/*<td className="px-4 py-2">
                                                        <button
                                                            aria-label="Remove item"
                                                            className="flex items-center px-3 py-3 rounded-md bg-rose-800"
                                                            // onClick={() => {
                                                            //     handleDeleteItem(
                                                            //         product._id,
                                                            //     );
                                                            // }}
                                                        >
                                                            <img
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9f633674f0df01065322a67dea6b7c57ce5836d66a0a7508860d670e95e0354?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                                                alt="Remove"
                                                                className="w-4"
                                                            />
                                                        </button>
                                                    </td>*/}
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </header>
                                {/*<button className="absolute bottom-3.5 self-start px-4 py-2 max-w-full text-xl text-white bg-rose-800 rounded-md  right-[18px]  max-md:px-5">
                                    Continue Shopping
                                </button>*/}
                            </section>
                        </>
                    )}
                    {number === 4 && (
                        <div className="flex justify-center">
                            {/*<img
                                loading="lazy"
                                src="https://w7.pngwing.com/pngs/93/992/png-transparent-razorpay-logo-tech-companies-thumbnail.png"
                                className="self-stretch object-contain w-20 my-auto ml-10 shrink-0 aspect-square"
                                alt=""
                            />*/}
                            <button
                                className="flex gap-2.5 justify-center items-center px-8 py-2.5 w-auto bg-[#A70024] rounded-md mt-3"
                                onClick={handlePayment}
                            >
                                <img
                                    loading="lazy"
                                    src="https://www.shutterstock.com/image-vector/chargeback-icon-symbol-return-money-600nw-1734002873.jpg"
                                    // src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0356f9899a54905a5151d259c2fd51a100e96a5bb2fe3c491ead985780307a0?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                    className="self-stretch object-contain my-auto shrink-0 w-7 aspect-square"
                                    alt=""
                                />
                                <span className="self-stretch my-auto text-white text-md">
                                    Continue To Payment
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckoutStep;
