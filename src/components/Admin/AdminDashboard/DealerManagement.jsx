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
import {
    dealersList,
    adminProductslist,
} from '../../../features/Admin/adminProductlistSlice';
import Pagination from '../../Pagination/Pagination';
import DealerServiceLocations from './DealerServiceLoactions';
import { stateChange } from '../../../features/Admin/Dealer/DealerServiceLocations';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import delete1 from '../../../Assets/delete.svg';
import edit from '../../../Assets/edit.svg';
import { data } from 'autoprefixer';
import { API_URL, IMAGE_URL } from '../../../Constants';

// Sample data for countries and states
const countryStateData = CuntrysData;

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    dob: Yup.date().required('Required'),
    gender: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    pincode: Yup.number()
        .typeError('Pincode must be a number')
        .required('Enter pincode')
        .test(
            'len',
            'Pincode must be exactly 6 digits',
            (val) => val && val.toString().length === 6,
        ),
    // password: Yup.string().required('Required'),
    // repassword: Yup.string()
    //     .required('Required')
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    password: Yup.string(),
    repassword: Yup.string(),
    // countryCode: Yup.string()
    //   .matches(/^\+[1-9]{1}[0-9]{1,3}$/, "Invalid country code")
    //   .required("Required"),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Required'),
    alternatePhoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Alternate phone number must be 10 digits')
        .required('Required'),
    pincode: Yup.string()
        .matches(/^[0-9]+$/, 'Pincode must be only numbers')
        .required('Pincode is required'),
    pincode: Yup.number()
        .typeError('Pincode must be a number')
        .required('Enter pincode')
        .test(
            'len',
            'Pincode must be exactly 6 digits',
            (val) => val && val.toString().length === 6,
        ),
    //   dateOfJoining: Yup.date().required("Required"),
    addressLine1: Yup.string().required('Required'),
    addressLine2: Yup.string(),
    landmark: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    //   pincode: Yup.string().required("Required"),
    // geoLocationCode: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    longitude: Yup.number()
        .required('Required')
        .min(-180, 'Longitude must be at least -180')
        .max(180, 'Longitude must be at most 180'),

    latitude: Yup.number()
        .required('Required')
        .min(-90, 'Latitude must be at least -90')
        .max(90, 'Latitude must be at most 90'),
    shopImage: Yup.mixed().required('Required'),
    // .test(
    //   "fileSize",
    //   "File Size is too large",
    //   (value) => !value || (value && value.size <= 1024 * 1024)
    // ) // 1MB
    // .test(
    //   "fileFormat",
    //   "Unsupported Format",
    //   (value) =>
    //     !value || (value && ["image/jpeg", "image/png"].includes(value.type))
    // ),
});

const DealerForm = () => {
    // const [imagePreview, setImagePreview] = useState(null);
    const [imageObj, setImageObj] = useState();
    // const [image, setImage] = useState({});
    const [image, setImage] = useState(null); // Store image from dealer
    const [imagePreview, setImagePreview] = useState(null);
    const [dealerEditId, setDealerEditId] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [number, setNumber] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [states, setStates] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [initialDealer, setInitialDeaeler] = useState({});
    const [dealers, setDealers] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const { dealersItems, dealersStatus, dealersSuccess } = useSelector(
        (state) => state.adminproducts,
    );
    const { dealerStatus, dealer, message } = useSelector(
        (state) => state.dealerAdd,
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (dealersStatus === 'idle') {
            dispatch(dealersList(1));
        }
    }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

    useEffect(() => {
        if (dealersItems && dealersItems.data) {
            //console.log('dealersItems.data: ', dealersItems.data);
            setDealers(dealersItems.data.dealers);
        }
    }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: '',
    });

    const closeToast = () => {
        setToast({ visible: false, message: '', type: '' });
    };

    const [includeId, setIncludeId] = useState(false);
    const [dealerForm, setDealerForm] = useState({
        ...(includeId && { _id: '' }),
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        occupation: '',
        password: '',
        email: '',
        countryCode: '+91',
        phoneNumber: '',
        alternatePhoneNumber: '',
        //   dateOfJoining: "",
        addressLine1: '',
        addressLine2: '',
        landmark: '',
        city: '',
        country: '',
        state: '',
        pincode: '',
        // geoLocationCode: '',
        status: 'A',
        repassword: '',
        shopImage: null,
        // geoLocationCode: '',
        longitude: '',
        latitude: '',
        //   serviceLocations: [],
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    {
        /******function for checking are valuses changing or not before submitting the form for dealer Edit*******/
    }
    const getChangedValues = (initialDealer, currentValues) => {
        const changedValues = {};
        //console.log(currentValues);
        for (const key in currentValues) {
            if (key !== '_id') {
                if (key === 'shopImage') {
                    if (
                        typeof currentValues.shopImage === 'string' &&
                        currentValues.shopImage === initialDealer.shopImage
                    ) {
                        continue; // No change, do not include in the changed values
                    }
                    // If it's a File object or URL has changed, include in the changed values
                    changedValues[key] = currentValues[key];
                } else if (currentValues[key] !== initialDealer[key]) {
                    changedValues[key] = currentValues[key];
                }
            }
        }
        return changedValues;
    };
    {
        /******-----------------------------------------------------------------------------------*******/
    }

    const handleAdddealer = async (data) => {
        setIsEditMode(false);
        // await dispatch(dealerRegistration(data));
        try {
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
                'Content-Type': 'multipart/form-data',
            };
            //console.log('!!!data: ', data);
            let reqOptions = {
                url: `${API_URL}/admin/dealer/add`,
                method: 'POST',
                headers: headers,
                data: data,
            };

            const response = await axios.request(reqOptions);
            //console.log('!!!response: ', response);

            if (response.data.success) {
                setToast({
                    visible: true,
                    message: response.data.message,
                    type: 'success',
                });
                setTimeout(() => {
                    handleCloseButton();
                }, 2000);
                dispatch(dealersList());
            } else if (!response.data.success) {
                setToast({
                    visible: true,
                    message: response.data.message,
                    type: 'danger',
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            //console.log('errors are occuring during creating product', error);
            setToast({
                visible: true,
                message: 'Internal occurred while creating product',
                type: 'danger',
            });
        }
        dispatch(dealersList());
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setErrors,
        validateForm,
        validateField,
        setTouched,
        submitCount,
    } = useFormik({
        initialValues: dealerForm,
        validationSchema: validationSchema,
        enableReinitialize: true,

        onSubmit: async (values, actions, initialValues) => {
            //console.log('^^^', values);
            setLoading(true);
            if (isEditMode) {
                //console.log('Edit mode');
                values.password = undefined;
                values.repassword = undefined;
            }
            //console.log('!!!', values.addressLine2);
            if (values.addressLine2 === '') {
                values.addressLine2 = undefined;
            }
            if (includeId) {
                const changedValues = getChangedValues(initialDealer, values);
                if (Object.keys(changedValues).length > 0) {
                    const formData = new FormData();
                    for (const [key, value] of Object.entries(values)) {
                        if (key === '_id') {
                            formData.append('dealerId', value);
                        }
                    }
                    for (const key in changedValues) {
                        if (key === 'shoImage' && key !== '_id') {
                            formData.append(
                                'shoImage',
                                changedValues.shopImage,
                            );
                        } else if (key !== '_id') {
                            formData.append(key, changedValues[key]);
                        }
                    }
                    //console.log('dealer formData: ', formData);
                    //console.log('___');

                    handleAdddealer(formData);
                } else {
                    setLoading(false);
                    //console.log('nothing to change');
                }
            } else {
                const formData = new FormData();

                for (const [key, value] of Object.entries(values)) {
                    formData.append(key, value);
                }

                if (imageObj instanceof File) {
                    formData.append('shopImage', imageObj);
                }
                //console.log('***');
                handleAdddealer(formData);
            }
            setTimeout(() => {
                actions.resetForm();
            }, 1500);
            // actions.setErrors();
        },
    });

    const handleInputChangen = (event) => {
        const file = event.target.files[0]; // Get the first file (single image)
        setFieldValue('shopImage', file); // Update Formik field value
        setImageObj(file); // Update state with the file object
        // setImage(URL.createObjectURL(file)); // Update state with the preview URL

        //console.log('handle input change is running');
        // const files = Array.from(event.target.files);
        // setImages((prevImages) => [...prevImages, ...files]);
        // setImagePreviews((prevPreviews) => [
        //   ...prevPreviews,
        //   ...files.map((file) => URL.createObjectURL(file)),
        // ]);
    };
    //   //console.log(values)
    //console.log('validation errors', errors);

    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        setFieldValue('country', selectedCountry);
        setFieldValue('state', '');
        setStates(countryStateData[selectedCountry] || []);
    };

    const [showAddDealer, setShowAddDealer] = useState();

    const handleShowDealer = () => {
        setIsEditMode(false);
        setImage(null);
        setImagePreview(null);
        setShowAddDealer(!showAddDealer);
    };
    const handleCloseButton = () => {
        setIncludeId(false);
        setShouldFetch(false);
        setShowAddDealer(!showAddDealer);
        setDealerForm({
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            occupation: '',
            password: '',
            email: '',
            countryCode: '+91',
            phoneNumber: '',
            alternatePhoneNumber: '',
            //   dateOfJoining: "",
            addressLine1: '',
            addressLine2: '',
            landmark: '',
            city: '',
            country: '',
            state: '',
            pincode: '',
            // geoLocationCode: '',
            status: 'A',
            repassword: '',
            shopImage: null,
            // geoLocationCode: '',
            longitude: '',
            latitude: '',
        });
        setImage({});
        setDealerEditId(null);
        setInitialDeaeler(null);
    };
    //console.log(values);

    useEffect(() => {
        if (image) {
            setImagePreview(`${IMAGE_URL}${image}`);
        }
    }, [image]);

    const handleEditDealer = (dealer) => {
        //console.log('@@@dealer: ', dealer);
        setIncludeId(true);
        setShouldFetch(true);
        setIsEditMode(true);

        setDealerForm({
            ...dealer,
            password: '******',
            repassword: '******',
            status: dealer.status,
            // geoLocationCode: dealer.geoLocationCode,
        });
        setInitialDeaeler(dealer);
        setImage(dealer.shopImage);
        setDealerEditId(dealer._id);
        setShowAddDealer(true);
        setStates(countryStateData[dealer.country] || []);
        // //console.log(dealer);
    };
    //  //console.log("dealer form",dealerForm)
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(dealersList(pageNumber));
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Show selected image preview
            setFieldValue('shopImage', file); // Update form field with new file
        }
    };
    {
        /*********************************handeling-deleting-dealer******************************************/
    }

    const [deleteDealerId, setDeleteDealerId] = useState(null);
    const [deletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteButton = (id) => {
        setShowDeletePopup(!deletePopup);
        setDeleteDealerId(id);
    };

    const handleDeleteDealer = () => {
        dispatch(dealerDelete(deleteDealerId));
        dispatch(dealersList());
        setDeleteDealerId(null);
        setShowDeletePopup(false);
    };

    const handleNoButton = () => {
        setShowDeletePopup(false);
    };

    {
        /*********************************handeling-deleting-dealer******************************************/
    }

    return (
        <div className="ml-[20rem] p-3 pl-6 pr-6 font-custom bg-[#F0F0F0] min-h-svh">
            {toast.visible && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
            {!showAddDealer && (
                <div className="flex items-center justify-between mt-3 mb-8">
                    <div className="flex gap-2 text-2xl font-medium">
                        <img
                            src={box_iocn}
                            alt="box icon"
                        />
                        Associated Dealers
                    </div>
                    <div className="space-x-4">
                        <button
                            onClick={handleShowDealer}
                            className=" text-white px-4 py-2 rounded-md bg-[#A70024] hover:bg-red-700"
                        >
                            Add Dealer
                        </button>
                    </div>
                </div>
            )}
            {showAddDealer && (
                <div className="flex items-center justify-between mb-4 ">
                    <div className="flex gap-2 text-2xl font-semibold">
                        <img
                            src={box_iocn}
                            alt="box icon"
                        />
                        {dealerForm.firstName
                            ? 'Edit Dealer'
                            : 'Dealer Registration'}
                    </div>
                    <div className="space-x-4 ">
                        <button
                            className=" px-4 py-2 rounded text-[#A70024] "
                            onClick={handleCloseButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
                        >
                            {/* <FaPlus className="inline-block mr-2" /> */}
                            {loading ? (
                                <Loader1 />
                            ) : (
                                <p>
                                    {dealerForm.firstName
                                        ? 'Save Changes'
                                        : 'Save'}
                                </p>
                            )}
                        </button>
                    </div>
                </div>
            )}
            {deletePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-md mx-2 bg-white rounded-lg p-9 font-custom ">
                        <h2 className="mb-3 text-xl font-semibold text-center">
                            Are you sure{' '}
                        </h2>
                        <h2 className="mb-5 text-sm text-center">
                            You want to delete this Dealer?{' '}
                        </h2>

                        <div className="flex justify-between">
                            <button
                                onClick={() => handleNoButton()}
                                className="px-6 py-2 text-black rounded-md cursor-pointer bg-zinc-200 hover:bg-zinc-400"
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

            {showAddDealer ? (
                <>
                    <form className="p-4 space-y-4 rounded-lg mr-60">
                        {errors &&
                            Object.keys(errors).length > 0 &&
                            submitCount > 0 && (
                                <div className="mb-4 p-2 text-white bg-rose-700 rounded">
                                    Please fill all required fields.
                                </div>
                            )}
                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Dealer First Name
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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
                                <label className="block text-sm text-zinc-600">
                                    Dealer Last Name
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Date of Birth
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formatDate(values.dob)}
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
                                <label className="block text-sm text-zinc-600">
                                    Gender
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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
                                    <option value="O">Other</option>
                                </select>
                                {errors.gender && touched.gender && (
                                    <p className="text-sm text-red-500">
                                        {errors.gender}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Occupation
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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
                                <label className="block text-sm text-zinc-600">
                                    Dealer's Shop Pincode
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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
                                    <p className="text-sm text-red-500">
                                        {errors.pincode}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Password
                                    {/* <span className="text-lg text-center text-red-500">
                                        *
                                    </span> */}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isEditMode}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {/* {errors.password && touched.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )} */}
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Confirm Password
                                    {/* <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc> */}
                                </label>
                                <input
                                    placeholder=""
                                    type="password"
                                    name="repassword"
                                    value={values.repassword}
                                    // disabled
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isEditMode}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {/* {errors.repassword && touched.repassword && (
                                    <p className="text-sm text-red-500">
                                        {errors.repassword}
                                    </p>
                                )} */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Email
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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
                                <label className="block text-sm text-zinc-600">
                                    Phone Number
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Alternate Phone Number
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="alternatePhoneNumber"
                                    value={values.alternatePhoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.alternatePhoneNumber &&
                                    touched.alternatePhoneNumber && (
                                        <p className="text-sm text-red-500">
                                            {errors.alternatePhoneNumber}
                                        </p>
                                    )}
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-600 mt-1">
                                    Date of Joining
                                </label>
                                <input
                                    type="date"
                                    name="dateOfJoining"
                                    value={values.dateOfJoining}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.dateOfJoining &&
                                    touched.dateOfJoining && (
                                        <p className="text-sm text-red-500">
                                            {errors.dateOfJoining}
                                        </p>
                                    )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Address 1
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={values.addressLine1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.addressLine1 &&
                                    touched.addressLine1 && (
                                        <p className="text-sm text-red-500">
                                            {errors.addressLine1}
                                        </p>
                                    )}
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-600 mt-1">
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
                                {errors.addressLine2 &&
                                    touched.addressLine2 && (
                                        <p className="text-sm text-red-500">
                                            {errors.addressLine2}
                                        </p>
                                    )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Landmark
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={values.landmark}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.landmark && touched.landmark && (
                                    <p className="text-sm text-red-500">
                                        {errors.landmark}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    City
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.city && touched.city && (
                                    <p className="text-sm text-red-500">
                                        {errors.city}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Country
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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
                                <label className="block text-sm text-zinc-600">
                                    State
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
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

                        <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                            {/* <div>
                <label className="block text-sm text-zinc-600">
                  Service Able Pincode
                  <spanc className="text-lg text-center text-red-500">*</spanc>
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
                            {/* <div>
                                <label className="block text-sm text-zinc-600">
                                    Geo Location Code
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="geoLocationCode"
                                    value={values.geoLocationCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.geoLocationCode &&
                                    touched.geoLocationCode && (
                                        <p className="text-sm text-red-500">
                                            {errors.geoLocationCode}
                                        </p>
                                    )}
                            </div> */}
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Longitude
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="longitude"
                                    value={values.longitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.longitude && touched.longitude && (
                                    <p className="text-sm text-red-500">
                                        {errors.longitude}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm text-zinc-600">
                                    Latitude
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </label>
                                <input
                                    type="text"
                                    name="latitude"
                                    value={values.latitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                />
                                {errors.latitude && touched.latitude && (
                                    <p className="text-sm text-red-500">
                                        {errors.latitude}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* selecting shop image */}
                        <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
                            <div className="flex gap-2 mb-4">
                                {/* <label className="block text-sm text-zinc-600">
                Shop Image
                <spanc className="text-lg text-center text-red-500">*</spanc>
              </label> */}
                                {/* <div className="block w-full px-2 py-2 mt-1 text-red-600 border rounded-md cursor-pointer focus:outline-blue-900"
            onClick={() => document.getElementById("shopimage").click()}
            >{shopimage?"Select Shop Image"}</div> */}
                                {/* <input
                type="file"
                name="shopImage"
                value={dealer?.shopImage}
                onChange={(event) => {
                  setFieldValue("shopImage", event.target.files[0]);
                }}
                onBlur={handleBlur}
                className="block w-full px-2 py-2 mt-1 text-red-600 border rounded-md cursor-pointer focus:outline-blue-900"
              />
              {errors.shopImage && touched.shopImage && (
                <p className="text-sm text-red-500">{errors.shopImage}</p>
              )} */}
                                <div
                                    className="flex items-center justify-center w-40 h-40 mt-1 text-red-400 bg-gray-100 border rounded-md cursor-pointer border-neutral-200 hover:border-blue-900"
                                    onClick={() =>
                                        document
                                            .getElementById('imageUpload')
                                            .click()
                                    }
                                >
                                    Shop Image
                                    <spanc className="text-lg text-center text-red-500">
                                        *
                                    </spanc>
                                </div>

                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    className="hidden"
                                />

                                {imagePreview && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <div className="relative w-40 h-40 p-4 border rounded-md border-neutral-200">
                                            <img
                                                src={imagePreview} // Display either dealer's image or newly selected image
                                                alt="Product Preview"
                                                className="object-cover w-full h-full rounded-md"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFieldValue(
                                                        'shopImage',
                                                        '',
                                                    );
                                                    setImagePreview(null); // Clear preview
                                                    setImage(null); // Clear dealer image
                                                }}
                                                className="absolute p-2 text-xs text-white bg-green-500 rounded-md top-1 right-1"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-0 mt-2">
                                {' '}
                                {errors.shopImage && touched.shopImage && (
                                    <p className="text-sm text-red-500">
                                        {errors.shopImage}
                                    </p>
                                )}{' '}
                            </div>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-20 mt-4">
                            <label className="block text-sm text-zinc-600">
                                Status
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="A"
                                        checked={values.status === 'A'}
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
                                        checked={values.status === 'D'}
                                    />
                                    <span className="ml-2">DeActive</span>
                                </label>
                            </div>
                            {errors.status && touched.status && (
                                <p className="text-sm text-red-500">
                                    {errors.status}
                                </p>
                            )}
                        </div>
                    </form>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2 text-2xl"></div>
                        <div className="space-x-4">
                            <button
                                className=" px-4 py-2 rounded text-[#A70024]"
                                onClick={handleCloseButton}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
                            >
                                {/* <FaPlus className="inline-block mr-2" /> */}
                                {loading ? (
                                    <Loader1 />
                                ) : (
                                    <p>
                                        {dealerForm.firstName
                                            ? 'Save Changes'
                                            : 'Save'}
                                    </p>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                        <thead className="bg-[#5C5C5C]">
                            <tr>
                                {/* <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white uppercase">
                <input type="checkbox" name="" id="" />
              </th> */}
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    No
                                </th>
                                <th className="px-0 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Id
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Name & Phone No
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Serviceable Pincode
                                </th>
                                <th className="px-4 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Inventory
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {dealers.map((dealer, index) => (
                                <tr
                                    key={dealer._id}
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
                                    <td className="px-0 py-4 whitespace-nowrap">
                                        {dealer.dealerId}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {dealer.firstName} {dealer.lastName}{' '}
                                        {dealer.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {/* {dealer.addressLine2.length > 15
                      ? `${dealer.addressLine2.substring(0, 14)}...`
                      : dealer.addressLine2} */}
                                        {dealer?.city}, {dealer?.pincode}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* <p>{dealer.serviceLocations[0].pincode}</p> */}
                                        <ul>
                                            {dealer.serviceLocations.map(
                                                (location, index) => (
                                                    <li key={index}>
                                                        {location.pincode}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {dealer.quantity}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`text-${dealer.status === 'A'
                                                    ? 'green'
                                                    : 'red'
                                                }-500`}
                                        >
                                            {dealer.status === 'A' ? (
                                                <p>Active</p>
                                            ) : (
                                                <p>DeActive</p>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-1 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                handleEditDealer(dealer)
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
                                                handleDeleteButton(dealer._id);
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
                    {dealersStatus === 'succeeded' && (
                        <Pagination
                            totalProducts={dealersItems.data.total}
                            productsPerPage={dealersItems.data.limit}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            )}
            {dealerEditId && (
                <DealerServiceLocations
                    shouldFetch={shouldFetch}
                    dealerId={dealerEditId}
                />
            )}
        </div>
    );
};

export default DealerForm;
