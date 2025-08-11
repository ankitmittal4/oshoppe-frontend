import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    fetchSubOrderDetail,
    fetchActivityList,
} from '../../features/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_URL } from '../../Constants';
//INFO: Order Steps
const steps = [
    {
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/47c754f724a3f5b01336b150f041083321dba020b01178730b3a8978230e4c40?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
        label: 'Order Placed',
    },
    {
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/be6e44800bd8aed3d8241dc10b30dcbc4803adc0a7c4cd3277bec02c74a52a71?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
        label: 'Packaging',
    },
    {
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/cf767ee7152706f25a12b3cc22a4620336c48dc9b168e60b592d919b901a1989?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
        label: 'On The Road',
    },
    {
        icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b8daaa6744b23611b5d257bf613eacd9ae58a5efc076c32aef7155a85098c754?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
        label: 'Delivered',
    },
];
const StepItem = ({ icon, label }) => (
    <div className="flex flex-col justify-center items-center w-[227px]">
        <img
            loading="lazy"
            src={icon}
            alt={`${label} status icon`}
            className="object-contain aspect-square w-[31px]"
        />
        <div className="mt-3">{label}</div>
    </div>
);

const OrderActivity = ({ iconBg, iconBorder, iconSrc, message, date }) => (
    <article className="flex flex-wrap items-start gap-4 mt-4 first:mt-0 max-md:max-w-full">
        <div
            className={`flex gap-2.5 items-center px-3 py-3 ${iconBg} rounded-sm border ${iconBorder} border-solid h-[47px] w-[47px]`}
        >
            <img
                loading="lazy"
                src={iconSrc}
                alt=""
                className="object-contain w-6 aspect-[1.04]"
            />
        </div>
        <div className="flex flex-col text-sm leading-none min-w-[240px] w-[846px] max-md:max-w-full">
            <p className="text-zinc-900 max-md:max-w-full">{message}</p>
            <time className="mt-2 text-slate-500 max-md:max-w-full">
                {date}
            </time>
        </div>
    </article>
);

//INFO: Progress bar
const ProgressDot = ({ isActive, hasCheck, isFilled }) => (
    <div
        role="progressbar"
        aria-valuenow={isActive ? 100 : 0}
        className={`flex shrink-0 rounded-full h-[23px] w-[23px] ${
            isActive
                ? 'bg-rose-800'
                : isFilled
                ? 'bg-rose-800 border-2 border-rose-800'
                : 'bg-white border-2 border-rose-800'
        } ${hasCheck ? 'flex-col justify-center items-center px-1.5' : ''}`}
    >
        {hasCheck && (
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/17506f9c74533e2e4ade516aac958e921555bd719eede185ac6ac82f99ed73f1?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                alt=""
                className="object-contain aspect-square w-[11px]"
            />
        )}
    </div>
);
const progressSteps = [
    { isActive: true },
    { isActive: true, isFilled: true },
    { isActive: true, isFilled: true },
    { isActive: false },
];

const MyOrderDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const subOrderId = params.id;
    //console.log('Sub orderId: ', subOrderId);
    const dispatch = useDispatch();
    const { subOrderDetail } = useSelector((state) => state.suborderDetail);
    const { activityList } = useSelector((state) => state.activityList);
    useEffect(() => {
        dispatch(fetchSubOrderDetail(subOrderId));
        dispatch(fetchActivityList(subOrderId));
    }, [dispatch]);
    const handleInvoice = () => {
        // navigate(`/profile/order/${subOrderId}/invoice`);
        window.open(`/profile/order/${subOrderId}/invoice`, '_blank');
    };
    //INFO: Order Activity
    const orderActivities = [
        {
            id: 1,
            iconBg: 'bg-blue-50',
            iconBorder: 'border-blue-100',
            iconSrc:
                'https://cdn.builder.io/api/v1/image/assets/TEMP/5ff9c65fbe4d763c82db38fb1154e4894cf702bfb484c52543f8b9a582e34679?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
            message: activityList[0]?.message,
            date: activityList[0]?.createdAt?.replace('T', ' ').slice(0, -8),
        },
        {
            id: 2,
            iconBg: 'bg-emerald-50',
            iconBorder: 'border-emerald-100',
            iconSrc:
                'https://cdn.builder.io/api/v1/image/assets/TEMP/4c7a1d174f26024b374b3785ad6ccf9781a2a5fc088190ef6f5f077124cf2b7e?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
            message: activityList[0]?.message,
            date: activityList[0]?.createdAt?.replace('T', ' ').slice(0, -8),
        },
        {
            id: 3,
            iconBg: 'bg-blue-50',
            iconBorder: 'border-blue-100',
            iconSrc:
                'https://cdn.builder.io/api/v1/image/assets/TEMP/36b5621acd17eda8bdd5c36bfb9e9254d3057d539694a609fdd9cc2535737351?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
            message: activityList[0]?.message,
            date: activityList[0]?.createdAt?.replace('T', ' ').slice(0, -8),
        },
        {
            id: 4,
            iconBg: 'bg-blue-50',
            iconBorder: 'border-blue-100',
            iconSrc:
                'https://cdn.builder.io/api/v1/image/assets/TEMP/ac2fb209e98954899ef5461e52625eb16eb28692adc2929319a956209846908a?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
            message: activityList[0]?.message,
            date: activityList[0]?.createdAt?.replace('T', ' ').slice(0, -8),
        },
        {
            id: 5,
            iconBg: 'bg-blue-50',
            iconBorder: 'border-blue-100',
            iconSrc:
                'https://cdn.builder.io/api/v1/image/assets/TEMP/c95cec8c4cab2423406777b3408db944b6e0d6e94d64f6f469228287fd3e719c?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
            message: activityList[0]?.message,
            date: activityList[0]?.createdAt?.replace('T', ' ').slice(0, -8),
        },
        {
            id: 6,
            iconBg: 'bg-emerald-50',
            iconBorder: 'border-emerald-100',
            iconSrc:
                'https://cdn.builder.io/api/v1/image/assets/TEMP/1945d9b4377e8ef6ac99f891e3d9557f8c74883d28d81f12da24dad7ddf2e23f?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150',
            message: activityList[0]?.message,
            date: activityList[0]?.createdAt?.replace('T', ' ').slice(0, -8),
        },
    ];
    // //console.log('!!', subOrderDetail);
    return (
        <div>
            <div className="flex items-center justify-between pl-6 mb-4">
                <div className="flex gap-2 text-2xl font-medium">
                    My Orders Detail
                </div>
            </div>
            <main
                data-layername="productTracking"
                className="flex flex-col p-6 sm:max-md:px-10 px-0"
            >
                <section
                    data-layername="heading"
                    className="flex flex-wrap items-center justify-between max-w-full gap-10 p-6 border border-solid rounded bg-yellow-50 border-amber-200 max-md:px-5"
                >
                    <div
                        data-layername="content"
                        className="flex flex-col self-stretch my-auto min-w-[240px] w-[387px]"
                    >
                        <h1
                            data-layername="96459761"
                            className="sm:text-xl leading-snug text-zinc-900"
                        >
                            {subOrderDetail?.subOrderFormatId}
                        </h1>
                        <div
                            data-layername="funFact"
                            className="flex items-center self-start justify-center gap-2 mt-2 text-sm leading-none text-neutral-600"
                        >
                            <p className="self-stretch my-auto">
                                {subOrderDetail?.numberOfProducts} Products
                            </p>
                            <span className="self-stretch my-auto">•</span>
                            <time
                                dateTime="2024-01-17T19:32"
                                className="self-stretch my-auto"
                            >
                                Order Placed on{' '}
                                {subOrderDetail?.deliveryDate.slice(0, 10)} at{' '}
                                {subOrderDetail?.deliveryDate.slice(11, 16)}
                            </time>
                        </div>
                    </div>
                    <p
                        data-layername="₹119900"
                        className="self-stretch my-auto text-3xl leading-none text-rose-800"
                    >
                        <span className="font-sans">₹</span>
                        {subOrderDetail?.totalAmount}
                    </p>
                </section>
                <section className="mt-6 text-sm leading-none text-zinc-900 max-md:max-w-full">
                    <p>
                        <span className="text-neutral-600">
                            Order expected arrival on{' '}
                            {subOrderDetail?.deliveryDate.slice(0, 10)}
                        </span>{' '}
                        <time dateTime="2021-01-23">
                            {' '}
                            at {subOrderDetail?.deliveryDate.slice(11, 16)}
                        </time>
                    </p>
                </section>

                <section
                    data-layername="progress"
                    className="flex flex-col items-center justify-center mt-8 text-sm leading-none text-center text-zinc-900 max-md:max-w-full"
                >
                    {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39db36d3ddc18697064c4968b171fb3c17d31100e201d4f7bc62be7e170c801c?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                        alt="Order progress indicator"
                        className="object-contain max-w-full rounded-none aspect-[30.3] w-[701px]"
                    /> */}
                    {/* <section
                        className="flex flex-wrap gap-10 rounded-none max-w-[700px]"
                        // role="region"
                        aria-label="Progress indicator"
                    >
                        <div className="flex">
                            <ProgressDot
                                isActive
                                hasCheck
                            />
                            <div className="flex shrink-0 self-start mt-2 h-2 bg-rose-800  w-[228px] -mr-1 -ml-1" />
                            <ProgressDot
                                isActive
                                isFilled
                            />
                            <div className="flex shrink-0 self-start mt-2 h-2 bg-rose-800 rounded-[97px] w-[228px] max-md:-mr-3" />
                        </div>
                        <div className="flex gap-10">
                            {progressSteps.slice(2).map((step, index) => (
                                <ProgressDot
                                    key={index}
                                    isActive={step.isActive}
                                    isFilled={step.isFilled}
                                />
                            ))}
                        </div>
                    </section> */}
                    {/* <div className="flex flex-wrap items-start mt-6 max-md:max-w-full">
                        {steps.map((step, index) => (
                            <StepItem
                                key={index}
                                icon={step.icon}
                                label={step.label}
                            />
                        ))}
                    </div> */}
                </section>
            </main>
            {/* //IDEA: order Activity  */}
            <section className="flex flex-col px-6 py-8 bg-white border border-gray-200 border-solid rounded-lg max-md:px-5">
                <h2 className="text-lg leading-none text-zinc-900 max-md:max-w-full">
                    Order Activity
                </h2>
                <div className="flex flex-col mt-6 max-md:max-w-full">
                    {orderActivities
                        .filter(
                            (activity) =>
                                activity.id <= activityList[0]?.status,
                        )
                        .reverse()
                        .map((activity) => (
                            <OrderActivity
                                key={activity.id}
                                {...activity}
                            />
                        ))}
                </div>
            </section>
            <section className="flex relative flex-col items-center pt-2.5 pb-1 mt-5 bg-white rounded-lg border border-solid border-gray-200 ">
                <header className="z-0 w-full text-xl text-black rounded-none">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-400 font-semibold">
                                <th className="px-4 py-2">Product</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                key={subOrderDetail?.subOrderId}
                                className=""
                            >
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-3">
                                        <img
                                            loading="lazy"
                                            // src={subOrderDetail?.image}
                                            src={`${IMAGE_URL}${subOrderDetail?.image}`}
                                            alt={subOrderDetail?.name}
                                            className="object-contain w-[60px] h-[60px]"
                                        />
                                        <p>
                                            {subOrderDetail?.name.length > 30
                                                ? subOrderDetail?.name.slice(
                                                      0,
                                                      30,
                                                  )
                                                : subOrderDetail?.name}
                                            {/* {subOrderDetail?.name?.slice(0, 10)} */}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    ₹{subOrderDetail?.price}
                                </td>
                                <td className="px-4 py-2">
                                    <span className="px-3">
                                        {subOrderDetail?.numberOfProducts}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="font-sans">₹</span>
                                    {subOrderDetail?.totalAmount}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </header>
            </section>
            <section className="flex flex-wrap items-center justify-between gap-10 pl-10 pr-10 mt-5 bg-white border border-gray-200 border-solid rounded-lg py-7">
                <article className="flex flex-col self-stretch my-auto min-w-[240px] w-[388px]">
                    <h2 className="text-xl leading-none text-zinc-900">
                        Delivery Address
                    </h2>
                    <div className="flex flex-col justify-center w-full mt-6 text-sm">
                        <header className="flex flex-col w-full">
                            <h3 className="text-lg leading-none text-zinc-900">
                                {subOrderDetail?.customerName}
                            </h3>
                            <p className="mt-3 leading-5 text-gray-500"></p>
                        </header>
                        <div className="flex items-center w-full mt-3 leading-none">
                            <span className="self-stretch my-auto text-zinc-900">
                                Phone Number:
                            </span>
                            <span className="self-stretch my-auto ml-1 text-gray-500">
                                {subOrderDetail?.phoneNumber}
                            </span>
                        </div>
                        <div className="flex items-center w-full mt-3 leading-none">
                            <span className="self-stretch my-auto text-zinc-900">
                                Email:
                            </span>
                            <span className="self-stretch my-auto ml-1 text-gray-500">
                                {subOrderDetail?.email}
                            </span>
                        </div>
                        <div className="flex items-center w-full mt-3 leading-none">
                            <span className="self-stretch my-auto text-zinc-900">
                                Address:{' '}
                            </span>
                            <span className="self-stretch my-auto ml-1 text-gray-500">
                                {subOrderDetail?.city}
                                {', '}
                                {subOrderDetail?.state}
                                {', '}
                                {subOrderDetail?.pincode}
                            </span>
                        </div>
                    </div>
                </article>
            </section>
            <button
                onClick={() => handleInvoice()}
                className="px-4 py-2 mt-4 text-white rounded-md bg-rose-800 font-custom hover:bg-rose-700"
            >
                View Invoice
            </button>
        </div>
    );
};

export default MyOrderDetail;

// const fetchSubOrderDetails = async (orderId) => {
//     try {
//         const headers = {
//             Authorization: localStorage.getItem('auth-token'),
//         };
//         // //console.log('headers: ', headers);
//         let reqOptions = {
//             url: '${API_URL}/customer/order/detail',
//             method: 'POST',
//             headers: headers,
//             data: { subOrderId: subOrderId },
//         };
//         let response = await axios.request(reqOptions);
//         setSubOrderDetail(response.data.data);
//         //console.log('sub order details', response.data.data);
//         return response.data;
//     } catch (error) {
//         return //console.log(error.response.data);
//     }
// };
// fetchSubOrderDetails();
