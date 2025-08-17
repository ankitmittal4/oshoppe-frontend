import React, { useState, useEffect } from 'react';
import CheckoutStep from './CheckoutStep';
import CheckoutStepContainer from './CheckoutStepContainer';
import { getcartItemList } from '../../features/CartCred/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, RAZORPAY_KEY_ID } from '../../Constants';
import { cloneWith } from 'lodash';

const Summary = () => {
    const navigate = useNavigate();
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
    const data = cartProducts?.data?.products || [];
    console.log("!!!!: ", data);
    useEffect(() => {
        //console.log('cartProducts: ', cartProducts);
        if (cartProducts && cartProducts?.data?.products) {
            const newdata = cartProducts?.data?.products;
            console.log('newdata: ', newdata);
            setCartItems(newdata);
        }
    }, [
        dispatch,
        cartStatus,
        cartProducts?.data?.products?.quantity,
        cartProducts,
    ]);

    // const [totalPrice, setTotalPrice] = useState(0);

    // useEffect(() => {
    //     const total = cartItems.reduce(
    //         (sum, item) => sum + item?.sellingPrice * item?.quantity,
    //         0
    //     );
    //     setTotalPrice(total);
    // }, [cartItems]);

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
    // const handlePayment = async () => {
    // try {
    //     let headers = {
    //         Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
    //     };
    //     let reqOptions = {
    //         url: `${API_URL}/customer/order/create`,
    //         method: 'POST',
    //         headers: headers,
    //     };
    //     let response = await axios.request(reqOptions);
    //     // console.log('Payment details: ', response.data);
    //     setPaymentLink(response.data.data);
    //     window.open(response.data.data, '_blank');
    // } catch (error) {
    //     console.error('Error in payment step:', error);
    // }
    // };
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    const handlePayment = async () => {
        // const amount = Number(totalPrice);
        const amount = 200;
        console.log("Amount: ", amount);
        const authToken = localStorage.getItem('auth-token');
        // setLoading(true);
        const res = await loadRazorpayScript();
        if (!res) {
            alert("Razorpay SDK failed to load");
            return;
        }

        const response = await axios.post(`${API_URL}/payment/create-order`, { amount }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });
        // setLoading(false);

        const { order } = response.data;
        const orderId = response.data?.orderId;
        // console.log("@@@: ", response.data?.orderId);
        // setVisible(false);

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Oshoppe",
            description: "Product Payment",
            order_id: order.id,
            prefill: {
                name: "Ankit Mittal",
                email: "oshoppe@example.com",
                contact: "7206058627",
            },
            theme: {
                color: "#528ff0",
            },
            handler: async (response) => {
                try {
                    // console.log("Success, under verify", response);
                    const transaction = await axios.post(`${API_URL}/payment/verify`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        amount,
                        orderId
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authToken}`,
                        },
                    });
                    // console.log("transaction: ", transaction.data.data);
                    alert("Payment Successful & Verified ✅");
                    navigate(`/profile/order/payment/${orderId}`)
                    // onMoneyAdded();
                    // fetchTransactions();
                    // window.dispatchEvent(new CustomEvent('updateBalance'));
                    // window.dispatchEvent(new CustomEvent('moneyAdded'));
                    // try {
                    //     await axios.post(`${API_URL}/email/payment-success`, {
                    //         email: userEmail,
                    //         name: userName,
                    //         amount: amount,
                    //         transactionId: transaction.data.data._id,
                    //     });
                    // console.log("Payment successfull and Confirmation email sent!");
                    // } catch (error) {
                    //     console.error("Error sending email:", error);
                    // }
                } catch (err) {
                    alert("Payment succeeded, but verification failed ❌");
                    console.error(err);
                }
            },
        };
        const rzp = new window.Razorpay(options);
        let failureHandled = false;
        rzp.on('payment.failed', async function (response) {
            console.log("Failed");
            if (failureHandled) return;
            failureHandled = true;
            const failureData = {
                code: response.error.code,
                description: response.error.description,
                source: response.error.source,
                reason: response.error.reason,
                order_id: response?.error?.metadata.order_id,
                payment_id: response.error.metadata.payment_id,
                amount,
            };
            navigate('/cart');
            try {
                const transaction = await axios.post(`${API_URL}/payment/failed`, failureData, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                // console.log(transaction);

                // console.log("Payment failure logged successfully");
            } catch (err) {
                console.error("Failed to report payment failure:", err);
            }
        });


        rzp.open();

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
                                {/* {totalPrice} */}
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
                                {/* {totalPrice} */}
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
