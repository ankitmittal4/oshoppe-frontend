import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CuntrysData from '../Data/CountrysData.json';
import { useSelector, useDispatch } from 'react-redux';
import {
    addAddress,
    listAddresses,
    deleteAddress,
    updateAddress,
} from '../../features/addressSlice';
import delete1 from '../../Assets/delete.svg';
import edit from '../../Assets/edit.svg';
import { API_URL } from '../../Constants';
import useTitle from '../../useTitle';
const countryStateData = CuntrysData;

const validationSchema = Yup.object({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.number()
        .typeError('Pincode must be a number')
        .required('Pincode is required')
        .test(
            'len',
            'Pincode must be exactly 6 digits',
            (val) => val && val.toString().length === 6,
        ),
    addressType: Yup.string().required('Please select an address type'),
    //ds
});

const Address = () => {
    useTitle('Oshoppe Address');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [maxAddress, setMaxAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { addresses, isLoading, error } = useSelector(
        (state) => state.address,
    );

    useEffect(() => {
        dispatch(listAddresses());
        setStates(countryStateData['India'] || []);
    }, [dispatch]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setValues,
    } = useFormik({
        initialValues: {
            address: '',
            city: '',
            state: '',
            landmark: '',
            pincode: '',
            addressType: '',
            setDefault: false,
        },
        validationSchema,
        onSubmit: (values) => {
            //console.log('Form Values', values);

            const data = {
                ...values,
                latitude: 0,
                longitude: 0,
            };

            if (selectedAddress) {
                dispatch(
                    updateAddress({
                        id: selectedAddress._id,
                        addressData: values,
                    }),
                ).then(() => {
                    dispatch(listAddresses());
                });
                setSelectedAddress(null);
            } else {
                if (addresses.length < 5) {
                    dispatch(addAddress(data)).then(() => {
                        dispatch(listAddresses());
                    });
                } else {
                    //console.log('You can only add 5 addresses');
                    setMaxAddress(true);
                    setTimeout(() => {
                        setMaxAddress(false);
                    }, 2500);
                }
            }
            resetForm();
        },
    });
    // const [location, setLocation] = useState({
    //     latitude: null,
    //     longitude: null,
    // });
    // const [error, setError] = useState(null);
    const getLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    //console.log('latitude: ', latitude);
                    //console.log('longitude: ', longitude);
                    // setLocation({ latitude, longitude });
                    // setError(null);
                    try {
                        const addressData = await fetchAddress(
                            latitude,
                            longitude,
                        );
                        // //console.log('Address: ', addressData);
                        setValues({
                            address: addressData.address,
                            city: addressData.city,
                            state: addressData.state,
                            pincode: addressData.pincode,
                            landmark: '',
                            addressType: '',
                            setDefault: addressData.setDefault || false,
                        });
                        // You can set the address in state if needed, e.g., setAddress(address);
                    } catch (error) {
                        console.error('Error fetching address: ', error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    //setError(error.message);
                    console.log(
                        'error while fetching location: ',
                        error.message,
                    );
                },
            );
        } else {
            //console.log('Geolocation is not supported by your browser.');
            // setError('Geolocation is not supported by your browser.');
        }
    };
    const fetchAddress = async (latitude, longitude) => {
        try {
            let reqOptions = {
                url: `${API_URL}/customer/getLocation`,
                method: 'POST',
                data: { latitude, longitude },
            };
            let response = await axios.request(reqOptions);
            if (response.data.data) {
                // //console.log('address: ', response.data.data);
                return response.data.data;
            } else {
                // throw new Error('No address found for the given coordinates.');
            }
        } catch (error) {
            console.error('Error fetching address from API: ', error);
            throw error; // Rethrow to handle in the calling function
        }
    };
    const handleDeleteAddress = async (addressId) => {
        await dispatch(deleteAddress(addressId));
        dispatch(listAddresses()).then(() => {
            dispatch(listAddresses());
        });
    };
    const handleEditAddress = async (address) => {
        setSelectedAddress(address);
        setValues({
            address: address.address,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            landmark: address.landmark || '',
            addressType: address.addressType,
            setDefault: address.isDefault || false,
            // setDefault: true,
        });
    };
    return (
        <div>
            {/* <h2 className="mb-4 text-xl font-semibold">Account/Address</h2> */}
            <h2 className="mb-4 text-xl font-semibold">Saved Addresses</h2>
            {/* Display loading state */}
            {/* {isLoading && <p>Loading...</p>} */}

            {/* Display error state */}
            {/* {error && <p className="text-red-500">{error}</p>} */}

            {/* Display address list */}
            <ul className="mb-6">
                {addresses.length > 0 &&
                    [...addresses]
                        .sort((a, b) => b.isDefault - a.isDefault)
                        .map((address, index) => (
                            <li
                                key={index}
                                className="lg:w-2/3 md:w-2/3 p-3 mb-2 bg-gray-100 rounded-md"
                            >
                                <p>
                                    <strong>
                                        {address.isDefault
                                            ? 'Primary Address: '
                                            : `Secondary Address ${index}: `}
                                    </strong>{' '}
                                    {address.address}
                                </p>
                                <p>
                                    <strong>City:</strong> {address.city}
                                </p>
                                <p>
                                    <strong>State:</strong> {address.state}
                                </p>
                                <p>
                                    <strong>Landmark:</strong>{' '}
                                    {address.landmark}
                                </p>
                                <p>
                                    <strong>Pincode:</strong> {address.pincode}
                                </p>
                                <p>
                                    <strong>Type:</strong> {address.addressType}
                                </p>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() =>
                                            handleEditAddress(address)
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
                                            handleDeleteAddress(address._id);
                                        }}
                                        className="text-red-500"
                                    >
                                        <img
                                            src={delete1}
                                            alt=""
                                            className="w-10 h-7"
                                        />
                                    </button>
                                </div>
                            </li>
                        ))}
            </ul>

            <button
                className="px-4 py-2 mt-4 text-white rounded-md bg-rose-800 font-custom hover:bg-rose-700"
                onClick={getLocation}
            >
                {loading ? 'Loading...' : 'Fetch my location'}
            </button>
            {/* {error && <p style={{ color: 'red' }}>Error: {error}</p>} */}

            {/* {location.latitude && location.longitude && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )} */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center px-6 py-2 border-b border-neutral-200 max-w-[852px] max-md:px-5"
            >
                <div className="flex flex-col w-full rounded-xl max-w-[804px] max-md:max-w-full">
                    <div className="flex flex-col w-full text-base text-gray-500 max-md:max-w-full">
                        <div className="flex flex-wrap items-start w-full gap-3 max-md:max-w-full">
                            <div className="flex flex-col w-full mt-5 max-md:max-w-full">
                                <textarea
                                    name="address"
                                    placeholder="Address (Area and Street)"
                                    className="w-full px-3.5 pt-2.5 pb-14 bg-white rounded-lg border border-gray-300 shadow-sm min-h-[90px] text-gray-600 focus:outline-blue-900 resize-none"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></textarea>
                                {errors.address && touched.address && (
                                    <p className="text-xs text-red-500">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-wrap items-start w-full gap-3 max-md:max-w-full">
                                <div className="flex w-full max-md:flex-col gap-1.5">
                                    <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City / District / Town"
                                            className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                            value={values.city}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.city && touched.city && (
                                            <p className="text-xs text-red-500">
                                                {errors.city}
                                            </p>
                                        )}
                                    </div>

                                    <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                                        <select
                                            name="state"
                                            className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                            value={values.state}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">
                                                Select State
                                            </option>
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
                                            <p className="text-xs italic text-red-500">
                                                {errors.state}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex w-full max-md:flex-col gap-1.5">
                                    <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                                        <input
                                            type="text"
                                            name="landmark"
                                            placeholder="Landmark(Optional)"
                                            className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                            value={values.landmark}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>

                                    <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                                        <input
                                            type="number"
                                            name="pincode"
                                            placeholder="Pincode"
                                            className="block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md focus:outline-blue-900"
                                            value={values.pincode}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.pincode && touched.pincode && (
                                            <p className="text-xs italic text-red-500">
                                                {errors.pincode}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {selectedAddress && (
                                    <div className="mt-5">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="setDefault"
                                                checked={values.setDefault}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="w-4 h-4 text-red-600 border-gray-300"
                                                disabled={
                                                    selectedAddress.isDefault
                                                }
                                            />
                                            <span>Set as Primary Address</span>
                                        </label>
                                        {/* {selectedAddress.isDefault && (
                                            <p className="text-xs text-gray-500">
                                                This is already your primary
                                                address.
                                            </p>
                                        )} */}
                                    </div>
                                )}
                            </div>
                            <div className="flex w-full max-md:flex-col gap-1.5"></div>
                        </div>
                    </div>
                    <fieldset className="flex flex-wrap justify-between w-full mt-3 max-md:max-w-full">
                        <legend className="sr-only">Address Type</legend>

                        <div className="flex items-center gap-2 my-2">
                            <input
                                type="radio"
                                id="home"
                                name="addressType"
                                value="home"
                                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.addressType === 'home'}
                            />
                            <label
                                htmlFor="home"
                                className="text-sm text-slate-700"
                            >
                                Home (All day delivery)
                            </label>
                        </div>

                        <div className="flex items-center gap-2 my-2">
                            <input
                                type="radio"
                                id="work"
                                name="addressType"
                                value="work"
                                className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.addressType === 'work'}
                            />
                            <label
                                htmlFor="work"
                                className="text-sm text-slate-700"
                            >
                                Work (Delivery between 10 AM - 5 PM)
                            </label>
                        </div>
                    </fieldset>
                    {errors.addressType && touched.addressType && (
                        <p className="text-xs italic text-red-500">
                            {errors.addressType}
                        </p>
                    )}

                    <div className="flex mt-6 text-base">
                        <div className="flex items-center w-full">
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-white bg-rose-800 rounded-lg border border-rose-800 border-solid shadow-sm"
                            >
                                {selectedAddress
                                    ? 'Update Address'
                                    : 'Add Address'}
                            </button>
                            <p className="ml-7 font-semi-bold text-rose-700">
                                {maxAddress &&
                                    'You can only add up to 5 Addresses'}
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Address;
