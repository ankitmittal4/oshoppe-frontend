// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { FaTachometerAlt, FaShoppingCart, FaBox, FaDollarSign, FaChartLine } from 'react-icons/fa';

// const Dashboard = () => {
//   const[noOfProducts , setNoOfProducsts] = useState()

//   const noOfProduct = async()=>{
//    try {
//     const reqOptions = {
//       url: "${API_URL}/admin/dashboard",
//       method: "POST",
//       headers: {
//         Authorization:localStorage.getItem('admin-token')
//       }
//     }

//     const response = await axios.request(reqOptions);
//     //console.log(response.data);
//     if(response.data.success){
//       setNoOfProducsts(response.data.data.numberOfProducts);
//     }

//     return response.data.data
//    } catch (error) {
//     console.error(error);
//    }
//   }

//   useEffect(() => {
//    noOfProduct();

//   }, [noOfProduct])

//   //console.log(noOfProducts)

//   return (
//     <div className="p-4 ml-72">
//       <div className="flex items-center mb-4 text-2xl font-bold">
//         <FaTachometerAlt className="mr-2" />
//         Dashboard
//       </div>
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Sales</h2>
//         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h3 className="text-lg font-medium">Total Sales</h3>
//             <p className="text-2xl">$10,000</p>
//             <p>100 Orders</p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h3 className="text-lg font-medium">Total Products</h3>
//             <p className="text-2xl">{noOfProducts}</p>
//             <p></p>
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow">
//             <h3 className="text-lg font-medium">Net Profit</h3>
//             <div className="flex items-center">
//               <FaChartLine className="mr-2 text-2xl" />
//               <p className="text-2xl">$5,000</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Orders</h2>
//         <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded-lg shadow md:grid-cols-4">
//           <div>
//             <h3 className="text-lg font-medium">Total Orders</h3>
//             <p className="text-2xl">150</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-medium">Pending Orders</h3>
//             <p className="text-2xl">50</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-medium">Dispatched Orders</h3>
//             <p className="text-2xl">80</p>
//           </div>
//           <div>
//             <h3 className="text-lg font-medium">Returned Orders</h3>
//             <p className="text-2xl">20</p>
//           </div>
//         </div>
//       </div>
//       <div className="mb-6">
//         <h2 className="text-xl font-semibold">Recent Orders</h2>
// <div className="p-4 bg-white rounded-lg shadow">
//   <table className="min-w-full divide-y divide-gray-200">
//     <thead>
//       <tr>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Invoice
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Product Info
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Customer Info
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Date
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Amount
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Qty
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Payment Method
//         </th>
//         <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
//           Status
//         </th>
//       </tr>
//     </thead>
//     <tbody className="bg-white divide-y divide-gray-200">
//       {/* Map through recent orders here */}
//       <tr>
//         <td className="px-6 py-4 whitespace-nowrap">INV001</td>
//         <td className="px-6 py-4 whitespace-nowrap">Product 1</td>
//         <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
//         <td className="px-6 py-4 whitespace-nowrap">2022-01-01</td>
//         <td className="px-6 py-4 whitespace-nowrap">$100</td>
//         <td className="px-6 py-4 whitespace-nowrap">1</td>
//         <td className="px-6 py-4 whitespace-nowrap">Credit Card</td>
//         <td className="px-6 py-4 whitespace-nowrap">Pending</td>
//       </tr>
//       {/* More rows */}
//     </tbody>
//   </table>
// </div>;
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import SalesOverview from "./SalesOverview";
// import OrdersOverview from "./OrdersOverview";
// import RecentOrders from "./RecentOrders";
import { API_URL } from '../../../Constants';

function MainContent() {
    const [dealers, setDealers] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [products, setProducts] = useState(0);
    const token = localStorage.getItem('admin-token');

    const orderStats = [
        { label: 'Total Orders', value: '10' },
        { label: 'Pending Orders', value: '4' },
        { label: 'Dispatched Orders', value: '4' },
        { label: 'Returned Orders', value: '0' },
    ];
    const orderData = [
        {
            invoice: '#0928819',
            product: 'Paint 1',
            customer: 'Kishor s',
            date: '16 Aug 2023',
            amount: '₹1500',
            quantity: '23',
            paymentMethod: 'UPI',
            status: 'New Order',
        },
        {
            invoice: '#0928819',
            product: 'Paint 1',
            customer: 'Kishor s',
            date: '16 Aug 2023',
            amount: '₹1500',
            quantity: '14',
            paymentMethod: 'UPI',
            status: 'Accepted',
        },
        {
            invoice: '#0928819',
            product: 'Paint 1',
            customer: 'Kishor s',
            date: '16 Aug 2023',
            amount: '₹1500',
            quantity: '43',
            paymentMethod: 'UPI',
            status: 'In transit',
        },
        {
            invoice: '#0928819',
            product: 'Paint 1',
            customer: 'Kishor s',
            date: '16 Aug 2023',
            amount: '₹1500',
            quantity: '23',
            paymentMethod: 'UPI',
            status: 'Delivered',
        },
        {
            invoice: '#0928819',
            product: 'Paint 1',
            customer: 'Kishor s',
            date: '16 Aug 2023',
            amount: '₹1500',
            quantity: '42',
            paymentMethod: 'UPI',
            status: 'Cancelled',
        },
    ];
    // //console.log("token: ", token);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(
                    `${API_URL}/admin/dashboard`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                // //console.log("response: ", res.data.data);
                const { numberOfCustomers, numberOfDealers, numberOfProducts } =
                    res.data.data;
                setProducts(numberOfProducts);
                setDealers(numberOfDealers);
                setCustomers(numberOfCustomers);
            } catch (error) {
                //console.log('dashboard error: ', error);
            }
        };
        fetchData();
    }, []);
    return (
        <main className="flex flex-col w-auto max-md:ml-0 max-md:w-full p-4 bg-[#F0F0F0] ml-[20rem]">
            <div className="flex flex-col mt-0 max-md:max-w-full">
                <h1 className="flex items-center self-start gap-2 text-xl font-medium leading-tight whitespace-nowrap text-zinc-900">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/09a0194d4c2bf8de05a158e869d12c32a572c1cf623acdba3d9bb6d7ed852070?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                        className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
                        alt=""
                    />
                    Dashboard
                </h1>
                <div className="flex items-start w-full gap-5 bg-white border border-gray-100 border-solid mt-9 rounded-xl max-md:max-w-full">
                    <section className="flex flex-col flex-1 shrink p-5 w-full bg-white rounded-xl border border-gray-100 border-solid basis-0 min-w-[240px] max-md:max-w-full">
                        <div className="flex flex-col w-full max-md:max-w-full">
                            <div className="flex flex-wrap items-center justify-between w-full gap-10 font-medium whitespace-nowrap max-md:max-w-full">
                                <h2 className="self-stretch my-auto text-xl leading-tight text-zinc-600">
                                    Sales
                                </h2>
                                <div className="flex gap-1.5 items-center self-stretch px-1 my-auto text-base text-right text-white">
                                    <span className="self-stretch my-auto">
                                        Monthly
                                    </span>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/84faa3e5b8db370decdb1d71aa7fe3df4dcf9e149e5285c7a1d6fe05037a8e49?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                        className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-5 items-start mt-2.5 w-full max-md:max-w-full">
                                <div className="flex flex-col flex-1 shrink items-start px-5 pt-5 pb-3 rounded-md basis-0 bg-neutral-100 min-h-[118px] min-w-[240px]">
                                    <div className="flex flex-col justify-center h-[51px]">
                                        <h3 className="text-base text-black">
                                            Total Sales
                                        </h3>
                                        <p className="mt-1.5 text-2xl font-medium text-neutral-700 ">
                                            <span className="font-sans">₹</span>
                                            10034.90
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-2 mt-3 text-base">
                                        <span className="text-black">
                                            Order Quantity :
                                        </span>
                                        <span className="font-medium text-neutral-700">
                                            100
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 shrink items-start px-5 pt-5 pb-3 rounded-md basis-0 bg-neutral-100 min-h-[118px] min-w-[240px]">
                                    <div className="flex flex-col justify-center h-[51px]">
                                        <h3 className="text-base text-black">
                                            Number of Dealers/Franchise
                                        </h3>
                                        <p className="mt-1.5 text-2xl font-medium text-neutral-700">
                                            {dealers}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 shrink items-start px-5 pt-5 pb-3 rounded-md basis-0 bg-neutral-100 min-h-[118px] min-w-[240px]">
                                    <div className="flex flex-col justify-center h-[51px]">
                                        <h3 className="text-base text-black">
                                            Number of Customers
                                        </h3>
                                        <p className="mt-1.5 text-2xl font-medium text-neutral-700">
                                            {customers}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 shrink items-start px-5 pt-5 pb-3 rounded-md basis-0 bg-neutral-100 min-h-[118px] min-w-[240px]">
                                    <div className="flex flex-col justify-center h-[51px]">
                                        <h3 className="text-base text-black">
                                            Number of Products
                                        </h3>
                                        <p className="mt-1.5 text-2xl font-medium text-neutral-700">
                                            {products}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-1 shrink gap-2.5 items-start py-5 pr-1 pl-5 text-base rounded-md basis-4 bg-neutral-100 min-w-[240px]">
                                    <div className="flex flex-col w-[89px]">
                                        <h3 className="text-black">
                                            Net Profit
                                        </h3>
                                        <p className="mt-1.5 font-medium text-neutral-700">
                                            <span className="font-sans">₹</span>
                                            100
                                        </p>
                                    </div>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/71cd8ae431908da9704999dcee8f0eb1c8eb7cabd1887a20ea63f910ed190395?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                        className="object-contain shrink-0 aspect-[2.42] w-[189px]"
                                        alt="Net Profit Graph"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full mt-7">
                    <h2 className="gap-10 self-stretch max-w-full text-xl font-medium leading-tight whitespace-nowrap text-zinc-600 w-[720px]">
                        Orders
                    </h2>
                    <div className="flex flex-wrap gap-8 justify-center items-center p-5 mt-2.5 w-full rounded-md bg-neutral-100 max-md:max-w-full">
                        {orderStats.map((stat, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <div className="flex shrink-0 self-stretch my-auto w-0.5 bg-red-600 rounded-xl h-[30px]" />
                                )}
                                <div className="flex flex-col self-stretch justify-center flex-1 my-auto shrink basis-0">
                                    <h3 className="text-base text-black">
                                        {stat.label}
                                    </h3>
                                    <p className="mt-1.5 text-lg font-medium text-neutral-700">
                                        {stat.value}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </section>
                <section className="flex flex-col w-full mt-7 text-zinc-900 max-md:max-w-full">
                    <h2 className="flex items-center self-start gap-2 text-xl font-medium leading-tight">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2d7c737e9c22f62168fb3cbe1fc304ba242f9896456cc7735707e19988f4f8c?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                            className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
                            alt=""
                        />
                        Recent Orders
                    </h2>
                    <div className="flex overflow-hidden flex-col mt-4 w-full text-sm leading-tight bg-white rounded-md min-h-[356px] shadow-[0px_4px_14px_rgba(0,0,0,0.06)] max-md:max-w-full">
                        <div className="flex flex-col w-full max-md:max-w-full">
                            <div className="overflow-x-auto bg-white rounded-lg shadow">
                                <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                                    <thead className="bg-[#5C5C5C]">
                                        <tr>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                INVOICE
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                PRODUCT INFO
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                CUSTOMER INFO
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                DATE
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                AMOUNT
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                QTY
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                PAYMENT MEHOD
                                            </th>
                                            <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                INV001
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Product 1
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                John Doe
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                2022-01-01
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                $100
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                1
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Credit Card
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                Pending
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* {orderData.map((order, index) => ({
                <OrderRow key={index} {...order} /> 
              }))} */}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default MainContent;
