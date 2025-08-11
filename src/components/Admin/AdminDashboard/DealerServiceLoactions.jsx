import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dealersList } from '../../../features/Admin/adminProductlistSlice';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import { CiSearch } from 'react-icons/ci';
import { dealerLinking } from '../../../features/Admin/Dealer/dealerAddSlice';
import * as Yup from 'yup';
import Loader1 from '../../Loaders/Loader1';
import { locationList } from '../../../features/Admin/Dealer/DealerServiceLocations';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import delete1 from '../../../Assets/delete.svg';
import edit from '../../../Assets/edit.svg';
import { API_URL } from '../../../Constants';

function DealerServiceLocations({ dealerId, shouldFetch }) {
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [states, setStates] = useState([]);
    const [Locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [locationToEdit, setLocationToEdit] = useState(null);

    const dispatch = useDispatch();

    const { isLocationLoading, locations, locationsStatus } = useSelector(
        (state) => state.locationlist,
    );

    const [pincode, setPincode] = useState('');
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        if (shouldFetch) {
            dispatch(locationList(dealerId));
        }
    }, [dispatch, shouldFetch]);

    //console.log('location status: ' + locationsStatus);
    //console.log(dealerId);

    useEffect(() => {
        if (locations && locations.data) {
            setLocations(locations.data.serviceLocations);
            setFilteredLocations(locations.data.serviceLocations);
        }
    }, [dispatch, locationsStatus, locations, locations.data]);

    // //console.log(filteredLocations);
    // //console.log(Locations);

    const [selectedOptions, setSelectedOptions] = useState(null);

    const dealerOptions = Locations.map((location) => ({
        value: location._id,
        label: `${location._id.slice(-6)} - ${location.pincode}`,
    }));

    const handleChangeSearch = (selected) => {
        setSelectedOptions(selected || []);
        if (selected === null || selected.length === 0) {
            handleClear();
        }
    };

    const handleSearch = () => {
        if (selectedOptions?.length > 0) {
            const filtered = Locations.filter((location) =>
                selectedOptions.some((option) => location._id === option.value),
            );
            setFilteredLocations(filtered);
        } else {
            setFilteredLocations(Locations);
        }
    };

    const handleClear = () => {
        setSelectedOptions([]); // Clear selected options
        setFilteredLocations(Locations); // Reset filtered list
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(dealersList(pageNumber));
    };

    const [showPopup, setShowPopup] = useState(false);
    const [units, setUnits] = useState(null);
    const [addDealerMsg, setAddDealerMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validationSchema = Yup.object().shape({
        // pincode: Yup.number()
        //   .required("Enter pincode")
        //   .matches(/^\d{6}$/, "Pincode must be exactly 6 digits"),
        pincode: Yup.number()
            .typeError('Pincode must be a number')
            .required('Enter pincode')
            .test(
                'len',
                'Pincode must be exactly 6 digits',
                (val) => val && val.toString().length === 6,
            ),
        locationName: Yup.string().required('Enter location name'),
        state: Yup.string().required('Enter state'),
    });

    const locationInfo = {
        pincode: '',
        locationName: '',
        state: '',
        dealerId: dealerId,
    };
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        validationSchema: validationSchema,
        initialValues: locationInfo,
        onSubmit: async (values, action) => {
            setLoading(true);
            try {
                let headersList = {
                    Authorization: localStorage.getItem('admin-token'),
                };

                let reqOptions = {
                    url: isEditing
                        ? `${API_URL}/serviceLocation/edit`
                        : `${API_URL}/serviceLocation/add`,
                    method: isEditing ? 'PATCH' : 'POST',
                    headers: headersList,
                    data: isEditing
                        ? { ...values, serviceLocationId: locationToEdit._id }
                        : values,
                };

                let response = await axios.request(reqOptions);
                const isSuccess = response.data.success;

                if (isSuccess) {
                    setSuccess(true);

                    // Update the Locations array manually
                    if (isEditing) {
                        setLocations((prevLocations) =>
                            prevLocations.map((location) =>
                                location._id === locationToEdit._id
                                    ? { ...location, ...values }
                                    : location,
                            ),
                        );
                        setFilteredLocations((prevLocations) =>
                            prevLocations.map((location) =>
                                location._id === locationToEdit._id
                                    ? { ...location, ...values }
                                    : location,
                            ),
                        );
                    } else {
                        // For adding a new location, refresh the list
                        await dispatch(locationList(dealerId));
                    }
                }

                setLoading(false);
                setTimeout(() => {
                    handleCancelButton();
                }, 3000);
            } catch (error) {
                //console.log('Error while submitting location', error);
                setLoading(false);
                handleCancelButton();
            } finally {
                action.resetForm();
            }
        },
    });
    //console.log(values);
    useEffect(() => {
        if (shouldFetch) {
            dispatch(locationList(dealerId));
        }
    }, [dispatch, dealerId, shouldFetch]);

    useEffect(() => {
        if (locations && locations.data) {
            const serviceLocations = locations.data.serviceLocations;
            setLocations(serviceLocations); // Set original locations
            setFilteredLocations(serviceLocations); // Set filtered locations
        }
    }, [locations]);

    const handleAddLocationButtonClick = () => {
        setShowPopup(!showPopup);
    };
    const handleEditLocation = (location) => {
        setIsEditing(true); // Mark as editing
        setLocationToEdit(location); // Store the location data
        setFieldValue('pincode', location.pincode); // Set the form's pincode field
        setFieldValue('locationName', location.locationName); // Set the location name field
        setFieldValue('state', location.state); // Set the state field
        setShowPopup(true); // Show the popup
    };

    const handleCancelButton = () => {
        setShowPopup(false);
        setSuccess(false);
        setIsEditing(false); // Reset editing state
        setLocationToEdit(null); // Clear the location to edit
    };

    const handleDeleteLocation = async () => {
        setLoading(true);
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/serviceLocation/delete`,
                method: 'POST',
                headers: headersList,
                data: {
                    serviceLocationId: deleteLocationId,
                },
            };

            let response = await axios.request(reqOptions);
            const isSuccess = response.data.success;
            if (isSuccess) {
                setSuccess(true);
            }

            await dispatch(locationList(dealerId));

            //console.log('location deleted successfully', response);
            setLoading(false);
            setTimeout(() => {
                handleNoButton();
            }, 3000);
        } catch (error) {
            //console.log('error while deleting location', error);
            setSuccess(false);
            setLoading(false);
        }
    };
    const [deleteLocationId, setDeleteLocationId] = useState(null);
    const [deletePopup, setShowDeletePopup] = useState(false);

    const handleDeleteButton = (id) => {
        setShowDeletePopup(!deletePopup);
        setDeleteLocationId(id);
    };

    const handleNoButton = () => {
        setShowDeletePopup(false);
        setSuccess(false);
    };

    return (
        <div className="mt-4 font-custom">
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-md p-6 mx-4 rounded-lg bg-zinc-200 ">
                        {!success && !loading && (
                            <>
                                <h2 className="mb-4 text-xl font-semibold text-center font-custom">
                                    Enter Pincode Details
                                </h2>
                                <div className="w-full">
                                    <input
                                        required
                                        name="pincode"
                                        value={values.pincode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="Enter Pincode"
                                        className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md outline-none hover:border-blue-900"
                                    />
                                    {errors.pincode && touched.pincode && (
                                        <p className="text-sm text-red-500">
                                            {errors.pincode}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full">
                                    <input
                                        required
                                        name="locationName"
                                        value={values.locationName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="Enter Location Name"
                                        className="w-full px-3 py-2 mt-3 bg-transparent border border-gray-300 rounded-md outline-none hover:border-blue-900"
                                    />
                                    {errors.locationName &&
                                        touched.locationName && (
                                            <p className="text-sm text-red-500">
                                                {errors.locationName}
                                            </p>
                                        )}
                                </div>
                                <div className="w-full">
                                    <input
                                        required
                                        name="state"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type="text"
                                        placeholder="Enter State"
                                        className="w-full px-3 py-2 mt-3 bg-transparent border border-gray-300 rounded-md outline-none hover:border-blue-900 "
                                    />
                                    {errors.state && touched.state && (
                                        <p className="text-sm text-red-500 ">
                                            {errors.state}
                                        </p>
                                    )}
                                </div>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handleCancelButton}
                                        className="px-3 py-2 text-red-500 rounded-md "
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="text-white px-3 py-2  ml-20 rounded-md min-w-16 bg-[#A70024] hover:bg-red-700"
                                    >
                                        {' '}
                                        {isEditing
                                            ? 'Edit Location'
                                            : 'Add Location'}
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
                            <div className="text-center ">
                                {isEditing ? (
                                    <p>
                                        The location has been Updated with
                                        dealer.
                                    </p>
                                ) : (
                                    <p>
                                        The location has been added with dealer.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {deletePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-md p-6 mx-2 rounded-lg bg-zinc-200 font-custom ">
                        {!success && !loading && (
                            <>
                                <h2 className="mb-3 text-xl font-semibold text-center">
                                    Are you sure{' '}
                                </h2>
                                <h2 className="mb-3 text-sm text-center">
                                    You want to delete this Location?{' '}
                                </h2>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleNoButton()}
                                        className="px-6 py-2 text-black rounded-md cursor-pointer bg-zinc-300 hover:bg-zinc-400"
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLocation()}
                                        className="px-6 py-2 text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-700"
                                    >
                                        yes
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
                            <p>The location has been deleted successfully</p>
                        )}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2 mb-3 font-medium">
                    {/* <div className="rounded-full min-w-12 ">
            <Select
              isMulti
              options={dealerOptions}
              value={selectedOptions}
              onChange={handleChangeSearch}
              className="text-sm basic-multi-select"
              classNamePrefix="select"
              placeholder="Search by ID or Pincode."
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,

                  borderRadius: 18,
                  minWidth: 200,
                }),
              }}
            />
          </div> */}

                    {/* <button onClick={handleClear} className="text-xl hover:scale-125">
            clear
          </button> */}
                    {/* <button onClick={handleSearch} className="text-xl hover:scale-125">
            <CiSearch />
          </button> */}
                </div>
                <div className="space-x-4">
                    <button
                        className="text-white px-4 py-2 rounded-lg bg-[#A70024] hover:bg-red-700"
                        onClick={() => handleAddLocationButtonClick()}
                    >
                        Add Location
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                    <thead className="bg-[#5C5C5C]">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white">
                                No
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white">
                                Pincode
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white">
                                Location Name
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white">
                                State
                            </th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredLocations.map((location, index) => (
                            <tr
                                key={location._id}
                                className={
                                    index % 2 === 0 ? '' : 'bg-[#F0F0F0]'
                                }
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {index + 1}
                                </td>
                                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {location._id.slice(0, 6)}
                </td>
                <td className="px-6 py-4 ">
                  {dealer.firstName} {dealer.lastName} {dealer.phoneNumber}
                </td> */}
                                <td className="px-6 py-4 ">
                                    {location.pincode}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    {location.locationName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {location.state}
                                </td>

                                {/* <td className="px-6 py-4 whitespace-nowrap">
                  <button className="mr-2 text-blue-500">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteButton(location._id)}
                  >
                    <FaTrash />
                  </button>
                </td> */}
                                <td className="px-1 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() =>
                                            handleEditLocation(location)
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
                                            handleDeleteButton(location._id);
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
                {/* {dealersStatus === "succeeded" && (
        <Pagination
          totalProducts={dealersItems.data.total}
          productsPerPage={dealersItems.data.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )} */}
            </div>
        </div>
    );
}

export default DealerServiceLocations;
