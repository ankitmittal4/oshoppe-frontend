import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import point_icon from '..//..//./../Assets/point-icon.svg';
import box_iocn from '..//..//./../Assets/box-time.svg';
import tracking_icon from '..//..//./../Assets/navigator-2.svg';
import tracking_icon2 from '..//..//./../Assets/navigator-yellow.svg';
import tracking_icon3 from '..//..//./../Assets/Navigator.svg';
// Update the path
import { format } from 'date-fns'; // Optional, to format date
import { useDispatch, useSelector } from 'react-redux';
import {
    orderDetails,
    orderUpdate,
} from '../../../features/Admin/Order/orderSlice';
import { resetOrderDetailsStatus } from '../../../features/Admin/Order/orderSlice';
import { fetchActivityList } from '../../../features/OrderSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import edit from '../../../Assets/edit.svg';
import delete1 from '../../../Assets/delete.svg';
import { IMAGE_URL } from '../../../Constants';

const statuses = [
    { id: 1, label: 'PENDING' },
    { id: 2, label: 'CONFIRMED' },
    { id: 3, label: 'PROCESSING' },
    { id: 4, label: 'SHIPPED' },
    { id: 5, label: 'IN_TRANSIT' },
    { id: 6, label: 'OUT_FOR_DELIVERY' },
    { id: 7, label: 'DELIVERED' },
    { id: 8, label: 'CANCELLED' },
    { id: 9, label: 'RETURNED' },
    { id: 10, label: 'REFUNDED' },
    { id: 11, label: 'FAILED' },
    { id: 12, label: 'ON_HOLD' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered':
            return 'bg-green-500';
        case 'In Transit':
            return 'bg-orange-500';
        case 'Accepted':
            return 'bg-blue-500';
        case 'New Order':
            return 'bg-yellow-500';
        default:
            return 'bg-gray-300';
    }
};

function OrderDetails() {
    const [productInfos, setProductInfos] = useState({});
    const [orderInfos, setOrderInfos] = useState({});
    const [customerInfos, setCustomerInfos] = useState({});
    const [subOrderId, setSubOrderId] = useState('66bc800d86d5315031ba1e4a');

    const params = useParams();
    const id = params.id;

    //console.log('params id ', id);

    const {
        orderInfo,
        customerInfo,
        productInfo,
        orderDetailsStatus,
        orderDetailsLoading,
        orderDetailsSuccess,
    } = useSelector((state) => state.order);

    const { activityList } = useSelector((state) => state.activityList);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log('status:111', orderDetailsStatus);
        dispatch(fetchActivityList(id));
        if (orderDetailsStatus === 'idle') {
            dispatch(orderDetails(id));
        }
        return () => {
            if (
                orderDetailsStatus === 'succeeded' ||
                orderDetailsStatus === 'failed'
            ) {
                dispatch(resetOrderDetailsStatus());
            }
        };
    }, [dispatch, orderDetailsStatus, id]);

    useEffect(() => {
        if (customerInfo && productInfo && orderInfo) {
            //console.log('~~~~~~~~~~~~~~~~~', orderInfo);
            setProductInfos(productInfo);
            setCustomerInfos(customerInfo);
            setOrderInfos(orderInfo);
        }
    }, [dispatch, productInfo, customerInfo, orderInfo]);

    //console.log(orderInfos);
    //console.log(productInfos);
    //console.log(customerInfos);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const orderStatusData = [
        {
            status: 'New Order',
            date: '2024-08-10',
            message: 'Your order has been placed.',
        },
        {
            status: 'Accepted',
            date: '2024-08-11',
            message: 'Your order has been accepted.',
        },
        {
            status: 'In Transit',
            date: '2024-08-12',
            message: 'Your order is on the way.',
        },
        {
            status: 'Delivered',
            date: '2024-08-13',
            message: 'Your order has been delivered.',
        },
    ];

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

    const getStatusIcon = (status) => {
        switch (status) {
            case 1:
                return tracking_icon;
            case 2:
                return tracking_icon2;
            case 3:
                return tracking_icon3;
            case 4:
                return tracking_icon2;
            case 5:
                return tracking_icon2;
            case 6:
                return tracking_icon2;
            case 7:
                return tracking_icon2;
            case 8:
                return tracking_icon2;
            case 9:
                return tracking_icon2;
            case 10:
                return tracking_icon2;
            case 11:
                return tracking_icon2;
            case 12:
                return tracking_icon2;
            default:
                return 'bg-gray-300';
        }
    };

    //   const { orderId } = useParams();
    //   const order = orderDetails.find((order) => order.id === parseInt(orderId));
    const categories = [
        { id: 1, label: 'Customer Info' },
        { id: 2, label: 'Order Info' },
        { id: 3, label: 'Product Info' },
        { id: 4, label: 'Order Activity' },
    ];
    const [selectedCategory, setSelectedCategory] = useState(1);

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
    };

    const [selectedStatus, setSelectedStatus] = useState(orderInfo.status);

    const handleStatusChange = (e) => {
        const newStatus = parseInt(e.target.value);
        setSelectedStatus(newStatus);
        // Call a function to update the status in your backend
        // updateOrderStatus(newStatus); // e.g., call your API here
        const data = {
            subOrderId: id,
            status: newStatus,
        };
        dispatch(orderUpdate(data));
    };

    useEffect(() => {
        // Load initial status from the API response when the component mounts
        setSelectedStatus(orderInfo.status);
    }, [orderInfo.status]);

    return (
        <div className="ml-[19rem] p-3 pl-6 pr-3 font-custom bg-[#F0F0F0] min-h-svh">
            <div className="flex justify-between items-center mb-4">
                <div className="text-2xl font-medium flex gap-2">
                    <img
                        src={box_iocn}
                        alt="box icon"
                    />
                    Order Id: {orderInfo.subOrderFormatId}
                </div>
            </div>
            <nav className="bg-zinc-300 rounded-full mb-6 w-fit">
                <ul className="flex space-x-6 px-10">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`relative px-4 flex flex-col justify-center items-center cursor-pointer ${selectedCategory === category.id
                                    ? 'text-[#A70024]'
                                    : 'text-neutral-500'
                                }`}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <p className="text-center py-4 font-semibold ">
                                {category.label}
                            </p>
                            {selectedCategory === category.id && (
                                <img
                                    src={point_icon}
                                    alt="Selected icon"
                                    className="absolute bottom-0"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            {selectedCategory === 1 && (
                <div className="p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 mr-60">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={customerInfo.name}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Customer PhoneNumber
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={customerInfo.phoneNumber}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black "
                                disabled
                                value={customerInfo.address}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={customerInfo.city}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                State
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black "
                                disabled
                                value={customerInfo.state}
                            />
                        </div>
                        {/* <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={customerInfo.country}
                            />
                        </div> */}
                    </div>
                </div>
            )}
            {selectedCategory === 2 && (
                <div className="p-6  mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6 mr-60">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Order Id
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black "
                                disabled
                                value={orderInfo?.subOrderFormatId}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Assigned Dealer
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={orderInfo.dealerName}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Order Date
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black "
                                disabled
                                value={formatDate(orderInfo.orderDate)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Expected Delivery Date
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={formatDate(orderInfo.deliveryDate)}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Total Amount
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black "
                                disabled
                                value={orderInfo.totalAmount}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Payment Mode
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={orderInfo.paymentMode}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                No Of Product
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                disabled
                                value={orderInfo.numberOfProducts}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm text-black/80"
                            >
                                Order Status
                            </label>
                            <select
                                id="orderStatus"
                                name="orderStatus"
                                className="mt-1 block w-full border rounded-md px-2 py-2 text-black"
                                // value={orderInfo.status}
                                value={selectedStatus}
                                onChange={handleStatusChange}
                            >
                                {statuses.map((status) => (
                                    <option
                                        key={status.id}
                                        value={status.id}
                                    >
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {selectedCategory === 3 && (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                        <thead className="bg-[#5C5C5C]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Brand
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Qty
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Price
                                </th>
                                {/* <th className="px-6 py-3 text-left text-xs font-bold text-white tracking-wider">
                                    Action
                                </th> */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 ">{1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        // src={productInfo.image}
                                        src={`${IMAGE_URL}${productInfo?.image}`}
                                        alt="Product"
                                        className="h-10 w-10 rounded-full"
                                    />
                                </td>

                                <td className="px-6 py-4 ">
                                    {productInfo.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {productInfo.brand}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {productInfo.size}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {productInfo.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-sans">₹</span>
                                    {productInfo.price}
                                </td>

                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        // onClick={() => handleEditProduct(product)}
                                        className="text-blue-500 mr-2"
                                    >
                                        <img
                                            src={edit}
                                            alt=""
                                            className="h-7 w-10"
                                        />
                                    </button>
                                    <button
                                        onClick={() => {
                                            // handleDeleteButton(product._id);
                                        }}
                                        className="text-red-500"
                                    >
                                        <img
                                            src={delete1}
                                            alt=""
                                            className="h-7 w-10"
                                        />
                                    </button>
                                </td> */}
                            </tr>
                        </tbody>
                    </table>
                    {/* {status === "succeeded" && (
          <Pagination
            totalProducts={items.data.total}
            productsPerPage={items.data.limit}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )} */}
                </div>
            )}
            {selectedCategory === 4 && (
                <div className="relative pl-10">
                    <div className="absolute h-full border-l-2 border-gray-300 top-0 left-2.5"></div>
                    {activityList.map((status, index) => (
                        <div
                            key={index}
                            className="relative mb-10 flex items-start"
                        >
                            <div
                                className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-white ${getStatusColor(
                                    status.status,
                                )}`}
                            >
                                <img
                                    src={getStatusIcon(status.status)}
                                    alt="tracking icon"
                                />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-semibold">
                                    {format(new Date(status.createdAt), 'PPP')}
                                    {',   '}
                                    {format(
                                        new Date(status.createdAt),
                                        'hh:mm a',
                                    )}
                                </p>
                                <p className="text-black">{status.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderDetails;
