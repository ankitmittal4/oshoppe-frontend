import React, { useEffect, useState } from 'react';
import box_iocn from '..//..//./../Assets/box-time.svg';
import { orderListing } from '../../../features/Admin/Order/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader1 from '../../Loaders/Loader1';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import edit from '../../../Assets/edit.svg';
import delete1 from '../../../Assets/delete.svg';
import { API_URL } from '../../../Constants';

function OrderManagement() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const { orderList, orderListStatus, isLoading } = useSelector(
        (state) => state.order,
    );
    const navigate = useNavigate();
    useEffect(() => {
        // //console.log('call1');
        if (orderListStatus === 'idle') {
            dispatch(orderListing());
        }
        //console.log(orderList);
    }, [dispatch, orderListStatus, orderList]);

    useEffect(() => {
        // //console.log('call2');
        if (orderList && orderList.data) {
            setOrders(orderList.data.orders);
        }
    }, [dispatch, orderListStatus, orderList]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [deleteOrderId, setDeleteOrderId] = useState(null);
    const [deletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteButton = (id) => {
        setShowDeletePopup(!deletePopup);
        setDeleteOrderId(id);
    };
    const handleNoButton = () => {
        setShowDeletePopup(false);
        setSuccess(false);
    };

    const handleEditOrder = (id) => {
        navigate(`order-details/${id}`);
    };
    const handleDeleteOrder = async () => {
        setLoading(true);
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/order/delete`,
                method: 'POST',
                headers: headersList,
                data: {
                    subOrderId: deleteOrderId,
                },
            };

            let response = await axios.request(reqOptions);
            const isSuccess = response.data.success;
            if (isSuccess) {
                setSuccess(true);
            }

            await dispatch(orderList());

            //console.log('order deleted successfully', response);
            setLoading(false);
            setTimeout(() => {
                handleNoButton();
            }, 3000);
        } catch (error) {
            //console.log('error while deleting order', error);
            setSuccess(false);
            setLoading(false);
        }
    };

    return (
        <div className="ml-[19rem] p-3 pl-6 pr-3 font-custom bg-[#F0F0F0] min-h-svh">
            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 text-2xl font-medium">
                    <img
                        src={box_iocn}
                        alt="box icon"
                    />
                    Recent Orders
                </div>
            </div>
            {deletePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-md p-6 mx-2 rounded-lg bg-zinc-200 font-custom ">
                        {!success && !loading && (
                            <>
                                <h2 className="mb-3 text-xl font-semibold text-center">
                                    Are you sure{' '}
                                </h2>
                                <h2 className="mb-3 text-sm text-center">
                                    You want to delete this order?{' '}
                                </h2>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleNoButton()}
                                        className="px-4 py-1 text-white bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => handleDeleteOrder()}
                                        className="px-4 py-1 text-white bg-red-900 rounded-md cursor-pointer hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                        {loading && (
                            <div className="flex items-center justify-center">
                                <Loader1 />
                            </div>
                        )}
                        {!loading && success && (
                            <p>The order has been deleted successfully</p>
                        )}
                    </div>
                </div>
            )}

            <div className="overflow-x-auto rounded-lg shadow ">
                <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                    <thead className="bg-[#5C5C5C]">
                        <tr>
                            {/* <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                <input type="checkbox" name="" id="" />
              </th> */}
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Id
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Product Info
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Customer Info
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Date
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Qty
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Payment Method
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {orderListStatus === 'succeeded' && (
                        <tbody className="divide-y divide-gray-200 ">
                            {orders.map((order, index) => (
                                <tr
                                    key={order.subOrderFormatId}
                                    className={
                                        index % 2 === 0 ? '' : 'bg-[#F0F0F0]'
                                    }
                                >
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        {order?.subOrderFormatId}
                                    </td>
                                    <td className="px-5 py-4 ">
                                        {order.productName}
                                    </td>
                                    <td className="px-5 py-4 ">
                                        {order.customerName}
                                    </td>
                                    <td className="px-3 py-4 ">
                                        {formatDate(order.orderDate)}
                                    </td>
                                    <td className="px-4 py-4 ">
                                        <span className="font-sans">₹</span>
                                        {order.price}
                                    </td>
                                    <td className="px-4 py-4 ">
                                        {order.quantity}
                                    </td>
                                    <td className="px-4 py-4 ">
                                        {order.paymentMethod}
                                    </td>

                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <div
                                            className={`font-custom text-center px-2 py-1 rounded-md  cursor-pointer  text-white ${getStatusColor(
                                                order.status,
                                            )}`}
                                        >
                                            {getStatus(order.status)}
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                handleEditOrder(
                                                    order.subOrderId,
                                                )
                                            }
                                            className="mr-2 text-blue-500"
                                        >
                                            <img
                                                src={edit}
                                                alt=""
                                                className="w-10 h-7"
                                            />
                                        </button>
                                        {/* <button
                                            onClick={() =>
                                                handleDeleteButton(
                                                    order.subOrderId,
                                                )
                                            }
                                            className="text-red-500"
                                        >
                                            <img
                                                src={delete1}
                                                alt=""
                                                className="w-10 h-7"
                                            />
                                        </button> */}
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
}

export default OrderManagement;

const getStatusColor = (status) => {
    switch (status) {
        case 1: // PENDING
            return 'bg-[#FFC107]'; // Amber
        case 2: // CONFIRMED
            return 'bg-[#4CAF50]'; // Green
        case 3: // PROCESSING
            return 'bg-[#2196F3]'; // Blue
        case 4: // SHIPPED
            return 'bg-[#673AB7]'; // Deep Purple
        case 5: // IN_TRANSIT
            return 'bg-[#00BCD4]'; // Cyan
        case 6: // OUT_FOR_DELIVERY
            return 'bg-[#FF9800]'; // Orange
        case 7: // DELIVERED
            return 'bg-[#8BC34A]'; // Light Green
        case 8: // CANCELLED
            return 'bg-[#F44336]'; // Red
        case 9: // RETURNED
            return 'bg-[#E91E63]'; // Pink
        case 10: // REFUNDED
            return 'bg-[#9C27B0]'; // Purple
        case 11: // FAILED
            return 'bg-[#B71C1C]'; // Dark Red
        case 12: // ON_HOLD
            return 'bg-[#FFEB3B]'; // Yellow
        default: // Default to CANCELLED
            return 'bg-[#F44336]'; // Red
    }
};

const getStatus = (status) => {
    switch (status) {
        case 1:
            return 'PENDING';
        case 2:
            return 'CONFIRMED';
        case 3:
            return 'PROCESSING';
        case 4:
            return 'SHIPPED';
        case 5:
            return 'IN TRANSIT';
        case 6:
            return 'OUT FOR DELIVERY';
        case 7:
            return 'DELIVERED';
        case 8:
            return 'CANCELLED';
        case 9:
            return 'RETURNED';
        case 10:
            return 'REFUNDED';
        case 11:
            return 'FAILED';
        case 12:
            return 'ON HOLD';
        default:
            return 'CANCELLED';
    }
};
