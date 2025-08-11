import React, { useEffect, useState } from 'react';
import productImage from '../../Assets/container2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubOrderList } from '../../features/OrderSlice';
import useTitle from '../../useTitle';
const products = [
    {
        id: 1,
        name: 'Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)Product ',
        image: productImage,
        quantity: 2,
        sellingPrice: 500,
        status: 'Delivered',
        date: '2023-08-04',
    },
    {
        id: 2,
        name: 'Product Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)',
        image: productImage,
        quantity: 1,
        sellingPrice: 1000,
        status: 'On the way',
        date: '2023-08-05',
    },
    {
        id: 3,
        name: 'Product Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)',
        image: productImage,
        quantity: 1,
        sellingPrice: 1000,
        status: 'Cancelled',
        date: '2023-08-05',
    },
    {
        id: 4,
        name: 'Product Granotone Spray Grade Speaker Cabinet Texture Coating BLACK Functional Wall Paint  (800 ml)',
        image: productImage,
        quantity: 1,
        sellingPrice: 1000,
        status: 'Returned',
        date: '2023-08-05',
    },
    // Add more products as needed
];

// const ProductCard = ({ product }) => {
//     return (
//         <div className="flex flex-col p-4 mb-4 bg-white border rounded-lg shadow-md sm:flex-row font-custom ">
//             <div className="mr-4 border rounded-lg bg-neutral-100 border-zinc-200">
//                 <img
//                     src={product.image}
//                     alt={product.name}
//                     className="object-cover w-32 h-32 mb-4 sm:mb-0"
//                 />
//             </div>
//             <div className="flex-1">
//                 <h3 className="mb-2 text-base font-normal lg:w-3/4">
//                     {product.name}
//                 </h3>
//                 <div className="flex gap-4">
//                     <p className="text-zinc-500">{product.quantity}L</p>
//                     <p className="font-semibold text-neutral-600 ">
//                         ₹{product.sellingPrice}
//                     </p>
//                 </div>
//             </div>
//             <div className="flex flex-col items-end justify-between">
//                 <span
//                     className={`px-4 py-2 rounded-full hover:scale-105 cursor-pointer  ${getStatusColor(
//                         product.status,
//                     )}`}
//                 >
//                     {product.status}
//                 </span>
//                 <p className="mt-2 text-sm text-gray-500">{product.date}</p>
//             </div>
//         </div>
//     );
// };

// const getStatusColor = (status) => {
//     switch (status) {
//         case 'Delivered':
//             return 'bg-green-100 border border-green-500 text-green-500';
//         case 'On the way':
//             return 'bg-yellow-100 border border-yellow-500 text-yellow-500';
//         case 'Cancelled':
//             return 'bg-red-100 border border-red-500 text-red-500';
//         case 'Returned':
//             return 'bg-gray-100 border border-gray-500 text-gray-500';
//         default:
//             return 'bg-gray-100 border border-gray-500 text-gray-500';
//     }
// };
const getStatusLabel = (status) => {
    switch (status) {
        case 1:
            return { label: 'New Order', color: 'text-blue-600' };
        case 2:
            return { label: 'Accepted', color: 'text-brown-400' };
        case 3:
            return { label: 'In Transit', color: 'text-orange-500' };
        case 4:
            return { label: 'Delivered', color: 'text-green-600' };
        case 5:
            return { label: 'Cancelled', color: 'text-red-600' };
        default:
            return { label: 'Unkonow', color: 'text-black' };
    }
};

const MyOrders = () => {
    useTitle('Oshoppe My Orders');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subOrders } = useSelector((state) => state.suborderList);

    useEffect(() => {
        dispatch(fetchSubOrderList());
    }, [dispatch]);
    const handleOrderDetail = (subOrderId) => {
        //console.log('Order Detail with id: ', subOrderId);
        navigate(`/profile/order/${subOrderId}`);
    };
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 text-2xl font-medium">My Orders</div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow ">
                <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                    <thead className="bg-[#5C5C5C]">
                        <tr>
                            {/* <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                <input type="checkbox" name="" id="" />
              </th> */}
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Order Id
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Date
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Total (Products)
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {subOrders.length > 0 && (
                        <tbody className="divide-y divide-gray-200 ">
                            {subOrders.map((order, index) => (
                                <tr
                                    key={order.subOrderId}
                                    className={
                                        index % 2 === 0
                                            ? 'bg-gray-50'
                                            : 'bg-[#F0F0F0]'
                                    }
                                >
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {order?.subOrderFormatId}
                                    </td>
                                    <td
                                        className={`px-5 py-4 ${
                                            getStatusLabel(order.status).color
                                        }`}
                                    >
                                        {getStatusLabel(order.status).label}
                                    </td>
                                    <td className="px-5 py-4 ">
                                        {order.date
                                            .replace('T', ' ')
                                            .slice(0, -8)}
                                    </td>
                                    <td className="px-4 py-4 ">
                                        <span className="font-sans">₹</span>
                                        {order.price} {`(${order.quantity})`}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <button
                                            className="mr-2 text-rose-800"
                                            onClick={() =>
                                                handleOrderDetail(
                                                    order.subOrderId,
                                                )
                                            }
                                            // onClick={handleOrderDetail(
                                            //     order.orderId,
                                            // )}
                                        >
                                            View Details -
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
                {/* {customerListStatus === 'succeeded' && (
                    <Pagination
                        totalProducts={customerList.data.total}
                        productsPerPage={customerList.data.limit}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                )} */}
            </div>
        </div>
    );
};

export default MyOrders;
