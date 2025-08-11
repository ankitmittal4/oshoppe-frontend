// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// // import { login } from './authSlice'; // Adjust the import based on your project structure
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const profileSchema = Yup.object({
//     firstName: Yup.string().required('Required'),
//     lastName: Yup.string().required('Required'),
//     phoneNumber: Yup.string().required('Required'),
//     email: Yup.string().email('Invalid email address').required('Required'),
//     password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
//   });

//   const {
//     values,
//     errors,
//     touched,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//   } = useFormik({
//     initialValues: {
//       firstName: '',
//       lastName: '',
//       phoneNumber: '',
//       email: '',
//       password: '',
//       gender: '',
//     },
//     validationSchema: profileSchema,
//     onSubmit: (values) => {
//     //   dispatch(login(values)).then(() => {
//     //     navigate('/');
//     //   });
//     },
//   });

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="flex min-h-screen">

//       {/* Sidebar */}
//       <div className="w-64 p-4 bg-gray-100">
//         <ul>
//           <li
//             className={`flex items-center cursor-pointer p-2 ${activeTab === 'profile' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('profile')}
//           >
//             <span className="mr-2">👤</span> Profile
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'orders' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('orders')}
//           >
//             My Orders
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'payments' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('payments')}
//           >
//             Payment
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'wishlist' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('wishlist')}
//           >
//             Wish List
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'address' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('address')}
//           >
//             Address
//           </li>
//           <li
//             className={`cursor-pointer p-2 ${activeTab === 'logout' && 'bg-green-200'}`}
//             onClick={() => handleTabChange('logout')}
//           >
//             Logout
//           </li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {activeTab === 'profile' && (
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="firstName" className="block text-sm text-green-600/80">
//                     FIRST NAME
//                   </label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     name="firstName"
//                     className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600"
//                     value={values.firstName}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.firstName && touched.firstName ? (
//                     <p className="text-xs italic text-red-500">{errors.firstName}</p>
//                   ) : null}
//                 </div>

//                 <div>
//                   <label htmlFor="lastName" className="block text-sm text-green-600/80">
//                     LAST NAME
//                   </label>
//                   <input
//                     type="text"
//                     id="lastName"
//                     name="lastName"
//                     className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600"
//                     value={values.lastName}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.lastName && touched.lastName ? (
//                     <p className="text-xs italic text-red-500">{errors.lastName}</p>
//                   ) : null}
//                 </div>

//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-sm text-green-600/80">
//                     PHONE NUMBER
//                   </label>
//                   <input
//                     type="text"
//                     id="phoneNumber"
//                     name="phoneNumber"
//                     className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600"
//                     value={values.phoneNumber}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.phoneNumber && touched.phoneNumber ? (
//                     <p className="text-xs italic text-red-500">{errors.phoneNumber}</p>
//                   ) : null}
//                   <button type="button" className="text-sm text-blue-600">Edit</button>
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm text-green-600/80">
//                     EMAIL
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600"
//                     value={values.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.email && touched.email ? (
//                     <p className="text-xs italic text-red-500">{errors.email}</p>
//                   ) : null}
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm text-green-600/80">
//                     PASSWORD
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600"
//                     value={values.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                   />
//                   {errors.password && touched.password ? (
//                     <p className="text-xs italic text-red-500">{errors.password}</p>
//                   ) : null}
//                   <button type="button" className="text-sm text-blue-600">Change</button>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-green-600/80">GENDER</label>
//                   <div className="flex items-center">
//                     <input
//                       type="radio"
//                       id="male"
//                       name="gender"
//                       value="male"
//                       checked={values.gender === 'male'}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     <label htmlFor="male" className="mr-4">Male</label>
//                     <input
//                       type="radio"
//                       id="female"
//                       name="gender"
//                       value="female"
//                       checked={values.gender === 'female'}
//                       onChange={handleChange}
//                       className="mr-2"
//                     />
//                     <label htmlFor="female">Female</label>
//                   </div>
//                 </div>
//               </div>

//               <button type="submit" className="px-4 py-2 mt-4 text-white bg-green-600 rounded-md">
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         )}

//         {activeTab === 'orders' && (
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg">Account / My Orders</h2>
//               <select className="px-2 py-1 border rounded-md">
//                 <option>Sort by</option>
//                 <option>On the way</option>
//                 <option>Delivered</option>
//                 <option>Cancelled</option>
//                 <option>Returned</option>
//               </select>
//             </div>
//             <div className="grid gap-4">
//               {/* Mock order list */}
//               <div className="flex items-center justify-between p-4 border rounded-md">
//                 <div>
//                   <h3 className="text-lg">Product Name</h3>
//                   <p>Status: Delivered</p>
//                 </div>
//                 <div className="text-right">
//                   <p>Date: 2023-08-04</p>
//                   <button className="text-sm text-blue-600">Rate</button>
//                 </div>
//               </div>
//               {/* Repeat above div for each order */}
//             </div>
//           </div>
//         )}

//         {activeTab === 'payments' && <div>Payment content goes here</div>}
//         {activeTab === 'wishlist' && (
//           <div>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
//               {/* Mock wishlist items */}
//               <div className="p-4 border rounded-md">
//                 <h3 className="text-lg">Product Name</h3>
//                 <button className="mt-2 text-sm text-red-600">Remove</button>
//               </div>
//               {/* Repeat above div for each wishlist item */}
//             </div>
//           </div>
//         )}
//         {activeTab === 'address' && <div>Address content goes here</div>}
//         {activeTab === 'logout' && <div>Logout content goes here</div>}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import ProfileForm from './ProfileForm';
// import MyOrders from './MyOrders';
// import Payment from './Payment';
// import Wishlist from './Wishlist';
// import Address from './Address';
// import Advisor from './Advisor';
// // import Logout from './Logout';

// const Profile = () => {
//     return (
//         <div className="flex flex-col lg:flex-row">
//             <Sidebar />
//             <main className="flex-1 p-4">
//                 <Routes>
//                     <Route
//                         path=""
//                         element={<ProfileForm />}
//                     />
//                     {/* <Route
//                         path="orders"
//                         element={<MyOrders />}
//                     /> */}
//                     {/* <Route
//                         path="payment"
//                         element={<Payment />}
//                     /> */}
//                     <Route
//                         path="wishlist"
//                         element={<Wishlist />}
//                     />
//                     <Route
//                         path="advisor"
//                         element={<Advisor />}
//                     />
//                     <Route
//                         path="address"
//                         element={<Address />}
//                     />
//                     {/* <Route path="logout" element={<Logout />} /> */}
//                 </Routes>
//             </main>
//         </div>
//     );
// };

// export default Profile;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfileForm from './ProfileForm';
import MyOrders from './MyOrders';
import Wishlist from './Wishlist';
import Address from './Address';
import Advisor from './Advisor';
import MyOrderDetail from './MyOrderDetail';
import Invoice from './Invoice';
import PaymentInvoice from './PaymentInvoice';
import useTitle from '../../useTitle';
const Profile = () => {
    // useTitle('Oshoppe Profile');
    const [refreshKey, setRefreshKey] = useState(Date.now());

    return (
        <div className="flex flex-col lg:flex-row">
            <Sidebar setRefreshKey={setRefreshKey} />
            <main className="flex-1 p-4">
                <Routes>
                    <Route
                        path=""
                        element={<ProfileForm />}
                    />
                    <Route
                        path="wishlist"
                        element={<Wishlist key={refreshKey} />}
                    />
                    <Route
                        path="orders"
                        element={<MyOrders />}
                    />
                    <Route
                        path="order/:id"
                        element={<MyOrderDetail />}
                    />
                    <Route
                        path="order/:id/invoice"
                        element={<Invoice />}
                    />
                    <Route
                        path="order/payment/:id"
                        element={<PaymentInvoice />}
                    />
                    <Route
                        path="advisor"
                        element={<Advisor />}
                    />
                    <Route
                        path="address"
                        element={<Address />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default Profile;
