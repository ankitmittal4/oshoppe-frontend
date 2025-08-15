import React, { useState, useEffect } from 'react';
import CheckoutStep from './CheckoutStep';
import CheckoutStepContainer from './CheckoutStepContainer';
import { getcartItemList } from '../../features/CartCred/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../Constants';

const Summary = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loginDetails, setLoginDetails] = useState(null); // State for login details
    const [expandedStep, setExpandedStep] = useState(null);
    const [paymentLink, setPaymentLink] = useState('');
    const dispatch = useDispatch();
    const { cartProducts, cartStatus } = useSelector(
        (state) => state.cartItemlist,
    );
    useEffect(() => {
        if (cartStatus === 'idle') {
            dispatch(getcartItemList());
        }
    }, [dispatch, cartStatus]);
    useEffect(() => {
        //console.log('cartProducts: ', cartProducts);
        if (cartProducts && cartProducts?.data?.products) {
            const newdata = cartProducts?.data?.products;
            //console.log('newdata: ', newdata);
            setCartItems(newdata);
        }
    }, [
        dispatch,
        cartStatus,
        cartProducts?.data?.products?.quantity,
        cartProducts,
    ]);
    const calculateTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item?.sellingPrice * item?.quantity,
            0,
        );
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Fetch login details from API
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

        fetchLoginDetails();
    }, []);

    // Steps with login details
    const steps = [
        {
            number: 1,
            title: 'Login',
            details: loginDetails
                ? {
                    name: `${loginDetails.firstName} ${loginDetails.lastName}`,
                    phone: loginDetails.phoneNumber,
                }
                : { name: 'Loading...', phone: 'Loading...' }, // Placeholder while loading
            isActive: true,
        },
        {
            number: 2,
            title: 'Delivery Address',
            details: 'This is the delivery address step',
            isActive: false,
        },
        {
            number: 3,
            title: 'Order Summary',
            details: 'This is the order summary step',
            isActive: false,
        },
        {
            number: 4,
            title: 'Payment Options',
            details: 'This is the payment options step',
            isActive: false,
        },
    ];

    const toggleStep = (stepNumber) => {
        setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
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
            // console.log('Payment details: ', response.data);
            setPaymentLink(response.data.data);
            window.open(response.data.data, '_blank');
        } catch (error) {
            console.error('Error in payment step:', error);
        }
    };

    return (
        <div className="flex justify-between">
            <main className="flex flex-col w-3/4 max-w-[calc(100%-404px)]">
                <div className="flex flex-col max-w-[852px]">
                    {steps.map((step) => (
                        <CheckoutStepContainer
                            key={step.number}
                            isActive={step.isActive}
                            onClick={() => toggleStep(step.number)}
                        >
                            <CheckoutStep
                                number={step.number}
                                title={step.title}
                                isActive={step.isActive}
                                isExpanded={expandedStep === step.number}
                                details={step.details}
                                onToggle={() => toggleStep(step.number)}
                            />
                        </CheckoutStepContainer>
                    ))}
                </div>
            </main>

            {/* Cart Total */}
            <div className="w-[404px] mt-4 space-y-4 lg:w-1/4 lg:mt-6 lg:ml-4 font-custom mr-10">
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
                            className="flex gap-2.5 justify-center items-center px-6 py-2.5 w-full bg-[#A70024] rounded-md mt-3"
                            onClick={handlePayment}
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
    );
};

export default Summary;

//IDEA: summary deatil of each
// <div className="flex flex-wrap gap-10 items-start px-6 py-5 border-b border-neutral-200 min-h-[90px] max-md:px-5">
//     <div className="flex flex-col text-sm">
//         <div className="flex items-center gap-8">
//             <div className="self-stretch my-auto text-neutral-400">Name</div>
//             <div className="self-stretch my-auto text-black">
//                 Mohammad Saqib
//             </div>
//         </div>
//         <div className="flex items-center mt-6 gap-7">
//             <div className="self-stretch my-auto text-neutral-400">Phone</div>
//             <div className="self-stretch my-auto text-black">
//                 +91 9555838570
//             </div>
//         </div>
//     </div>
//     <button className=" shrink gap-2.5 self-stretch px-6 py-2.5 text-base text-white bg-rose-800 rounded-md min-h-[40px]">
//         Continue Checkout
//     </button>
// </div>;
