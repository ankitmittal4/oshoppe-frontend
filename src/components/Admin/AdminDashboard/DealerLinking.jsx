import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dealersList } from '../../../features/Admin/adminProductlistSlice';
import { FaEdit, FaSearch, FaTrash } from 'react-icons/fa';
import Select from 'react-select';
import { CiSearch } from 'react-icons/ci';
import { dealerLinking } from '../../../features/Admin/Dealer/dealerAddSlice';
import * as Yup from 'yup';
import Loader1 from '../../Loaders/Loader1';
import Pagination from '../../Pagination/Pagination';
import box_iocn from '..//..//./../Assets/box-time.svg';
function DealerLinking({ productId, onLink }) {
    const [filteredDealers, setFilteredDealers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [states, setStates] = useState([]);
    const dispatch = useDispatch();

    const { dealersItems, dealersStatus, dealersSuccess } = useSelector(
        (state) => state.adminproducts,
    );
    const { dealerStatus, dealer, message } = useSelector(
        (state) => state.dealerAdd,
    );
    const {
        dealerLinkStatus,
        dealerLinkMsg,
        data,
        dealerLinkSuccess,
        dealerLinkLoading,
    } = useSelector((state) => state.dealerLink);

    const [dealers, setDealers] = useState([]);

    useEffect(() => {
        if (dealersStatus === 'idle') {
            //console.log('*****1');
            dispatch(dealersList(1));
        }
        // }, [dispatch, dealersStatus]);
    }, [dispatch, dealersStatus]);

    // useEffect(() => {
    //     if (dealerLinkSuccess) {
    //         dispatch(dealersList(currentPage));
    //     }
    // }, [dispatch, dealerLinkSuccess, currentPage]);

    useEffect(() => {
        if (dealersItems && dealersItems.data) {
            setDealers(dealersItems.data.dealers);
            setFilteredDealers(dealersItems.data.dealers);
        }
    }, [dispatch, dealersStatus, dealersItems, dealerStatus, currentPage]);

    const [selectedOptions, setSelectedOptions] = useState(null);

    const dealerOptions = dealers.map((dealer) => ({
        value: dealer._id,
        label: `${dealer._id.slice(-6)} - ${dealer.firstName}`,
        // label:"search dealers for link with product"
    }));

    const handleChangeSearch = (selected) => {
        setSelectedOptions(selected || []);
        if (selected === null || selected.length === 0) {
            handleClear();
        }
    };

    // Function to be executed when Enter is pressed
    // const handleEnterPress = (event) => {
    //   if (event.key === "Enter") {
    //     // Your function logic here
    //     handleSearch
    //     //console.log("Enter key pressed!");
    //   }
    // };

    // useEffect(() => {
    //   document.addEventListener("keydown", handleEnterPress);

    //   // Cleanup the event listener when the component unmounts
    //   return () => {
    //     document.removeEventListener("keydown", handleEnterPress);
    //   };
    // }, []);

    const handleSearch = () => {
        if (selectedOptions.length > 0) {
            const filteredDealers = dealers.filter((dealer) =>
                selectedOptions.some((option) => dealer._id === option.value),
            );
            setFilteredDealers(filteredDealers);
            //console.log('Selected Dealers:', selectedOptions);
        } else {
            setFilteredDealers(dealers);
        }
    };

    const handleClear = () => {
        setSelectedOptions([]);
        setFilteredDealers(dealers); // Reset to full list on clearing search
    };

    const handleEditDealer = (dealer) => {
        // setDealerForm(dealer);
        // setShowAddDealer(true);
        // //console.log(dealer);
    };

    const handlePageChange = (pageNumber) => {
        //console.log('*****2');
        setCurrentPage(pageNumber);
        dispatch(dealersList(pageNumber));
    };

    {
        /*****************selecting-dealers*********************************/
    }
    const [selectedDealerIds, setSelectedDealerIds] = useState([]);

    // Toggle selection of all dealers
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Select all dealers
            const allDealerIds = filteredDealers.map((dealer) => dealer._id);
            setSelectedDealerIds(allDealerIds);
        } else {
            // Deselect all dealers
            setSelectedDealerIds([]);
        }
    };

    // Toggle selection of a single dealer
    const handleSelectDealer = (e, dealerId) => {
        if (e.target.checked) {
            setSelectedDealerIds([...selectedDealerIds, dealerId]);
        } else {
            setSelectedDealerIds(
                selectedDealerIds.filter((id) => id !== dealerId),
            );
        }
    };

    // Log the selected dealer IDs to the console
    // //console.log("Selected Dealer IDs:", selectedDealerIds);
    {
        /*****************selecting-dealers*********************************/
    }
    {
        /*****************linking-dealers-with-product*********************************/
    }

    {
        /*****************linking-dealers-with-product*********************************/
    }

    const [showPopup, setShowPopup] = useState(false);
    const [units, setUnits] = useState(null);
    const [addDealerMsg, setAddDealerMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validationSchema = Yup.object().shape({
        units: Yup.number().required('Enter number of products.'),
    });

    const handleButtonClick = () => {
        if (selectedDealerIds.length > 0) {
            setShowPopup(!showPopup);
        }
    };

    const handleAddDealer = async () => {
        // You can handle the dealer addition logic here

        try {
            // Validate the input using Yup
            await validationSchema.validate({ units: units });
            setError('');

            // Proceed with form submission logic
            const linkingData = {
                productId: productId,
                dealerIds: selectedDealerIds,
                status: 'A',
                availability: 'Y',
                units: units,
            };
            //console.log('linkingData: ', linkingData);
            setLoading(true);
            await dispatch(dealerLinking(linkingData));
            onLink(linkingData);
            //console.log('dealerLinkSuccess: ', linkingData);
            // setFilteredDealers((prevFilteredDealers) =>
            //     prevFilteredDealers.filter(
            //         (dealer) => !selectedDealerIds.includes(dealer._id),
            //     ),
            // );
            setSelectedDealerIds([]);
            // setShowPopup(false);
            setUnits(null);

            // Simulate an API call with a timeout
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
                setAddDealerMsg(dealerLinkMsg);

                // Hide the popup after showing success message for 2 seconds
                setTimeout(() => {
                    setSuccess(false);
                    setShowPopup(false);
                    setAddDealerMsg('');
                }, 2000);
            }, 2000);
        } catch (validationError) {
            setError(validationError.message);
        }
    };
    // //console.log('dealerLinkSuccess: ', dealerLinkMsg);
    // //console.log('dealerLinkSuccess: ', data);

    const handleCancelButton = () => {
        setShowPopup(false);
        setUnits(null);
        setError(null);
    };

    // //console.log(dealerLinkSuccess)
    return (
        <div className="font-custom">
            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-zinc-200 rounded-lg p-6   max-w-md mx-4 ">
                        {!success && !loading && (
                            <>
                                <h2 className="text-xl font-semibold font-custom text-center  mb-4">
                                    Add Number Of Units
                                </h2>
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter Number Of Units"
                                    value={units}
                                    onChange={(e) => setUnits(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 outline-none hover:border-blue-800 bg-transparent"
                                />
                                {error && (
                                    <p className="text-red-500 mb-2 text-sm">
                                        {error}
                                    </p>
                                )}
                                <div className="flex justify-between">
                                    <button
                                        onClick={handleCancelButton}
                                        className=" text-red-500 px-3 py-2 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddDealer}
                                        className="bg-[#A70024] text-white px-3 py-2 rounded-md"
                                    >
                                        Add Dealer
                                    </button>
                                </div>
                            </>
                        )}
                        {loading && (
                            <div className="flex justify-center items-center">
                                <Loader1 />
                            </div>
                        )}

                        {success && (
                            <div className="text-center">
                                <h2 className="text-xl font-semibold mb-4">
                                    {addDealerMsg}
                                </h2>
                                <p>The product has been linked with dealer.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="text-2xl font-medium flex gap-2 mb-4">
                <img
                    src={box_iocn}
                    alt=""
                    srcset=""
                />
                Available Dealers
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="mb-3 font-medium flex gap-2">
                    <div className="rounded-full min-w-12 ">
                        <Select
                            isMulti
                            options={dealerOptions}
                            value={selectedOptions}
                            onChange={handleChangeSearch}
                            className="basic-multi-select text-sm"
                            classNamePrefix="select"
                            placeholder="Search by ID or Phone Number..."
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,

                                    borderRadius: 18,
                                    minWidth: 200,
                                }),
                            }}
                        />
                    </div>

                    {/* <button onClick={handleClear} className=" text-xl hover:scale-125">
                clear
            </button> */}
                    <button
                        onClick={handleSearch}
                        className=" text-xl hover:scale-125"
                    >
                        <CiSearch />
                    </button>
                </div>
                <div className="space-x-4">
                    <button
                        className="bg-[#A70024] hover:bg-red-700 text-white px-4 py-2 rounded-lg "
                        // onClick={() => handleAddDealer()}
                        onClick={() => handleButtonClick()}
                    >
                        Link Dealer
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-neutral-200">
                    <thead className="bg-[#5C5C5C]">
                        <tr>
                            <th className="px-6 py-3 text-left">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={
                                        selectedDealerIds.length ===
                                        filteredDealers.length
                                    }
                                />
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                    No
                </th> */}
                            <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                                Id
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                                Name & Phone No
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                                Address
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                                Serviceable Pincode
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                                Qty
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                                Status
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-medium text-white  tracking-wider">
                    Action
                </th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDealers.map((dealer, index) => (
                            <tr key={dealer._id}>
                                <td className="px-6 py-3">
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            handleSelectDealer(e, dealer._id)
                                        }
                                        checked={selectedDealerIds.includes(
                                            dealer._id,
                                        )}
                                    />
                                </td>

                                {/* <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1 + (currentPage - 1) * 10}
                    </td> */}
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {dealer.dealerId}
                                </td>
                                <td className="px-6 py-4 ">
                                    {dealer.firstName} {dealer.lastName}{' '}
                                    {dealer.phoneNumber}
                                </td>
                                <td className="px-6 py-4 ">
                                    {dealer.addressLine1}
                                </td>
                                <td className="px-6 py-4 ">
                                    {/* {dealer.serviceLocations.map((location) => (
                        <span>
                        {location.pincode}
                        {" , "}
                        </span>
                    ))} */}
                                    {dealer.pincode}
                                    {/* {dealer.serviceLocations
                        .map((location) => location.pincode)
                        .join(", ")} */}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {dealer.quantity}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`text-${
                                            dealer.status === 'A'
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
                                {/* <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500 mr-2">
                        <FaEdit />
                    </button>
                    <button className="text-red-500">
                        <FaTrash />
                    </button>
                    </td> */}
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
        </div>
    );
}

export default DealerLinking;
