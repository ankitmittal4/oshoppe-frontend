import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
    dealerDelete,
    dealerRegistration,
} from '../../../features/Admin/Dealer/dealerAddSlice';
import box_iocn from '..//..//./../Assets/box-time.svg';
import Loader1 from '../../Loaders/Loader1';
import Toast from '../../Tost/Tosts';
import CuntrysData from '../../Data/CountrysData.json';
import { dealersList } from '../../../features/Admin/adminProductlistSlice';
import Pagination from '../../Pagination/Pagination';
import DealerServiceLocations from './DealerServiceLoactions';
import {
    customerDelete,
    customerListing,
    customerUpdate,
} from '../../../features/Admin/Customer/customerSlice';
import { debounce } from 'lodash';
import { MdDeveloperBoard } from 'react-icons/md';
import point_icon from '..//..//./../Assets/point-icon.svg';
import delete1 from '../../../Assets/delete.svg';
import edit from '../../../Assets/edit.svg';
import axios from 'axios';
// Sample data for countries and states
const countryStateData = CuntrysData;

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    dob: Yup.date().required('Required'),
    gender: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    pincode: Yup.string()
        .required('Required')
        .matches(/^[0-9]+$/, 'Pincode must be only numbers'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Required'),
    addressLine1: Yup.string().required('Required'),
    addressLine2: Yup.string(),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
});

const CustomerManagements = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [states, setStates] = useState([]);
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [customerForm, setCustomerForm] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        occupation: '',
        pincode: '',
        email: '',
        phoneNumber: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        state: '',
        status: '',
    });
    const [showCustomer, setShowCustomer] = useState(false);
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);
    const [deletePopup, setShowDeletePopup] = useState(false);
    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: '',
    });
    const closeToast = () => {
        setToast({ visible: false, message: '', type: '' });
    };

    const {
        customerList,
        customerListStatus,
        isLoading,
        customerDeleteLoading,
        customerDeleteSuccess,
        customerEditStatus,
        customerEditLoading,
    } = useSelector((state) => state.customer);

    useEffect(() => {
        if (customerListStatus === 'idle') {
            dispatch(customerListing(currentPage));
        }
    }, [dispatch, customerList, customerListStatus, currentPage]);

    //console.log(customerListStatus);
    useEffect(() => {
        if (customerList && customerList.data) {
            setCustomers(customerList.data.customers);
        }
    }, [dispatch, customerList, customerListStatus, currentPage]);

    // const [toast, setToast] = useState({
    //   visible: false,
    //   message: "",
    //   type: "",
    // });

    // useEffect(() => {
    //   if (dealerStatus === "succeeded") {
    //     if (!dealer) {
    //       setToast({
    //         visible: true,
    //         message: message,
    //         type: "danger",
    //       });
    //     } else if (dealer) {
    //       setToast({
    //         visible: true,
    //         message: message,
    //         type: "success",
    //       });
    //     } else {
    //       setToast({
    //         visible: true,
    //         message: message,
    //         type: "danger",
    //       });
    //     }
    //   }
    //   //console.log("dealer", dealer);
    // }, [dealerStatus, message, dealer]);

    // const closeToast = () => {
    //   setToast({ visible: false, message: "", type: "" });
    // };

    const handleAddCustomer = async (data) => {
        // try {
        //   const headers = {
        //     Authorization: localStorage.getItem("admin-token"),
        //     "Content-Type": "multipart/form-data",
        //   };
        //   let reqOptions = {
        //     url: "${API_URL}/admin/dealer/add",
        //     method: "POST",
        //     headers: headers,
        //     data: data,
        //   };
        //   const response = await axios.request(reqOptions);
        //   // //console.log(response);
        //   if (response.data.success) {
        //     setToast({
        //       visible: true,
        //       message: response.data.message,
        //       type: "success",
        //     });
        //     setTimeout(() => {
        //       handleCloseButton();
        //     }, 2000);
        //     dispatch(dealersList());
        //   } else if (!response.data.success) {
        //     setToast({
        //       visible: true,
        //       message: response.data.message,
        //       type: "danger",
        //     });
        //   }
        //   setLoading(false);
        // } catch (error) {
        //   setLoading(false);
        //   //console.log("errors are occuring during creating product", error);
        //   setToast({
        //     visible: true,
        //     message: "Internal occurred while creating product",
        //     type: "danger",
        //   });
        // }
        // dispatch(dealersList());
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        validateForm,
        validateField,
        setTouched,
    } = useFormik({
        initialValues: customerForm,
        // validationSchema: validationSchema,
        enableReinitialize: true,

        onSubmit: async (values, actions) => {
            //console.log(values);

            const formData = new FormData();

            for (const key in values) {
                formData.append(key, values[key]);
            }
            // formData.append('firstName', "rahul kumar updated")

            formData.append('customerId', customerEditId);
            //console.log('formData: ', formData);
            dispatch(customerUpdate(formData));
            // setCustomerEditId(null)
            actions.resetForm();
        },
    });

    //console.log(values);
    // //console.log(errors);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFieldValue('country', selectedCountry);
        setFieldValue('state', '');
        setStates(countryStateData[selectedCountry] || []);
    };

    const handleShowDealer = () => {
        setShowCustomer(!showCustomer);
    };
    const handleCloseButton = () => {
        setShowCustomer(!showCustomer);
        // setDealerForm({});
    };

    const [customerEditId, setCustomerEditId] = useState(null);

    const handleEditCustomer = (custr) => {
        // setDealerForm(dealer);
        //console.log('custr: ', custr);
        setCustomerForm(custr);
        setShowCustomer(true);
        setCustomerEditId(custr._id);

        // //console.log(custr._id);
    };

    //console.log(customerEditLoading);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(customerListing(pageNumber));
    };

    {
        /*********************************handeling-deleting-dealer******************************************/
    }

    const handleDeleteButton = (id) => {
        setShowDeletePopup(!deletePopup);
        setDeleteCustomerId(id);
    };

    const handleDeleteDealer = debounce(async () => {
        await dispatch(customerDelete(deleteCustomerId));
        dispatch(customerListing(currentPage));
        setDeleteCustomerId(null);
        setShowDeletePopup(false);
    }, 300); // 300ms debounce delay

    const handleNoButton = () => {
        setShowDeletePopup(false);
    };

    {
        /*********************************handeling-deleting-dealer******************************************/
    }

    const categories = [
        { id: 1, label: 'Customer Info' },
        { id: 2, label: 'Order Info' },
    ];
    const [selectedCategory, setSelectedCategory] = useState(1);

    const handleCategoryClick = (id) => {
        setSelectedCategory(id);
    };

    return (
        <div className="ml-[20rem] p-3 pl-6 pr-3 font-custom bg-[#F0F0F0] min-h-svh">
            {/* {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )} */}
            {!showCustomer && (
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2 text-2xl font-medium">
                        <img
                            src={box_iocn}
                            alt="box icon"
                        />
                        Customer List
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={handleShowDealer}
                            className="bg-[#A70024] text-white px-4 py-2 rounded-lg hover:bg-red-800"
                        >
                            Add Customer
                        </button>
                    </div>
                </div>
            )}
            {showCustomer && (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2 text-2xl font-medium">
                            <img
                                src={box_iocn}
                                alt="box icon"
                            />
                            Customer Details
                        </div>
                        <div className="space-x-4">
                            <button
                                // onClick={handleAddProduct}
                                className=" text-[#A70024] px-4 py-2 rounded "
                                onClick={handleCloseButton}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-[#A70024] text-white px-4 py-2 rounded-lg hover:bg-red-800"
                            >
                                {/* <FaPlus className="inline-block mr-2" /> */}
                                {/* {dealerStatus === "loading" ? (
                <Loader1 />
              ) : ( */}
                                {customerEditLoading && <Loader1 />}
                                {/* {customerForm.firstName ? "Save " : "Save Changes"} */}
                                Save Changes
                                {/* )} */}
                            </button>
                        </div>
                    </div>
                    <nav className="mb-6 rounded-full bg-zinc-300 w-fit">
                        <ul className="flex px-10 space-x-6">
                            {categories.map((category) => (
                                <li
                                    key={category.id}
                                    className={`relative px-4 flex flex-col justify-center items-center cursor-pointer ${
                                        selectedCategory === category.id
                                            ? 'text-[#A70024]'
                                            : 'text-black'
                                    }`}
                                    onClick={() =>
                                        handleCategoryClick(category.id)
                                    }
                                >
                                    <p className="py-4 font-semibold text-center ">
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
                </>
            )}
            {deletePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-md p-6 mx-2 rounded-lg bg-zinc-200 font-custom ">
                        <h2 className="mb-3 text-xl font-semibold text-center">
                            Are you sure{' '}
                        </h2>
                        <h2 className="mb-3 text-sm text-center">
                            You want to delete this customer?{' '}
                        </h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleNoButton()}
                                className="px-6 py-2 text-black rounded-md cursor-pointer bg-zinc-300 hover:bg-zinc-400"
                            >
                                No
                            </button>
                            <button
                                onClick={() => handleDeleteDealer()}
                                className="px-6 py-2 text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-700"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showCustomer && selectedCategory === 1 && (
                <form className="p-4 space-y-4 rounded-lg mr-60">
                    {/* Dealer First Name and Dealer Last Name */}
                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Customer First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.firstName && touched.firstName && (
                                <p className="text-sm text-red-500">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Customer Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.lastName && touched.lastName && (
                                <p className="text-sm text-red-500">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Date of Birth and Gender */}
                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={values.dob}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.dob && touched.dob && (
                                <p className="text-sm text-red-500">
                                    {errors.dob}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md outline-none border-zinc-200 focus:border-blue-900 focus:ring-blue-900"
                            >
                                <option value="">Select Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && touched.gender && (
                                <p className="text-sm text-red-500">
                                    {errors.gender}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Password and PIN */}
                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Occupation
                            </label>
                            <input
                                type="text"
                                name="occupation"
                                value={values.occupation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.occupation && touched.occupation && (
                                <p className="text-sm text-red-500">
                                    {errors.occupation}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Pincode
                            </label>
                            <input
                                placeholder=""
                                type="text"
                                name="dealerShopPincode"
                                value={values.dealerShopPincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.countryCode && touched.countryCode && (
                                <p className="text-sm text-red-500">
                                    {errors.countryCode}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email and Phone Number */}
                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.email && touched.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.phoneNumber && touched.phoneNumber && (
                                <p className="text-sm text-red-500">
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Date of Joining and Address 1 */}
                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Address 1
                            </label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={values.addressLine1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.addressLine1 && touched.addressLine1 && (
                                <p className="text-sm text-red-500">
                                    {errors.addressLine1}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Address 2
                            </label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={values.addressLine2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                            />
                            {errors.addressLine2 && touched.addressLine2 && (
                                <p className="text-sm text-red-500">
                                    {errors.addressLine2}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* City and Country */}
                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                Country
                            </label>
                            <select
                                name="country"
                                value={values.country}
                                onChange={handleCountryChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md outline-none border-zinc-200 focus:border-blue-900 focus:ring-blue-900"
                            >
                                <option value="">Select Country</option>
                                {Object.keys(countryStateData).map(
                                    (country) => (
                                        <option
                                            key={country}
                                            value={country}
                                        >
                                            {country}
                                        </option>
                                    ),
                                )}
                            </select>
                            {errors.country && touched.country && (
                                <p className="text-sm text-red-500">
                                    {errors.country}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-600">
                                State
                            </label>
                            <select
                                name="state"
                                value={values.state}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md outline-none border-zinc-200 focus:border-blue-900 focus:ring-blue-900"
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option
                                        key={state}
                                        value={state}
                                    >
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && touched.state && (
                                <p className="text-sm text-red-500">
                                    {errors.state}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* State and Pincode */}

                    {/* <div>
            <label className="block text-sm font-medium text-zinc-600">
              Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
            />
            {errors.pincode && touched.pincode && (
              <p className="text-sm text-red-500">{errors.pincode}</p>
            )}
          </div> */}

                    {/* Status */}
                    <div className="flex items-center gap-20 mt-4">
                        <label className="block text-sm font-medium text-zinc-600">
                            Status
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="A"
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Active</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="D"
                                    onChange={handleChange}
                                    className="form-radio"
                                />
                                <span className="ml-2">Inactive</span>
                            </label>
                        </div>
                        {errors.status && touched.status && (
                            <p className="text-sm text-red-500">
                                {errors.status}
                            </p>
                        )}
                    </div>
                </form>
            )}
            {selectedCategory === 2 && showCustomer && <div>order Info</div>}
            {!showCustomer && (
                <div className="overflow-x-auto rounded-lg shadow ">
                    <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                        <thead className="bg-[#5C5C5C]">
                            <tr>
                                {/* <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                <input type="checkbox" name="" id="" />
              </th> */}
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    No
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Id
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Name & Phone No
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    City
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Pincode
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Status
                                </th>
                                <th className="px-12 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 ">
                            {customers.map((customer, index) => (
                                <tr
                                    key={customer._id}
                                    className={
                                        index % 2 === 0 ? '' : 'bg-[#F0F0F0]'
                                    }
                                >
                                    {/* <td className="px-6 py-4 bg-transparent outline-none whitespace-nowrap">
                  <input type="checkbox" name="" id="" />
                </td> */}

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {index + 1 + (currentPage - 1) * 10}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.customerId}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {customer.firstName} {customer.lastName}
                                        {<br />}
                                        {customer.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {customer.city}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {customer.pincode}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`text-${
                                                customer.status === 'A'
                                                    ? 'green'
                                                    : 'red'
                                            }-500`}
                                        >
                                            {customer.status === 'A' ? (
                                                <p>Active</p>
                                            ) : (
                                                <p>DeActive</p>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                handleEditCustomer(customer)
                                            }
                                            className="mr-2 text-blue-500"
                                        >
                                            <img
                                                src={edit}
                                                alt=""
                                                className="w-10 h-7"
                                            />
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDeleteButton(
                                                    customer._id,
                                                );
                                            }}
                                            className="text-red-500"
                                        >
                                            <img
                                                src={delete1}
                                                alt=""
                                                className="w-10 h-7"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {customerListStatus === 'succeeded' && (
                        <Pagination
                            totalProducts={customerList.data.total}
                            productsPerPage={customerList.data.limit}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerManagements;
