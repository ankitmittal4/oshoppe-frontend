import React, { useEffect, useState } from 'react';
import logo from '../../Assets/logo1.svg';
import logout1 from '../../Assets/logout.svg';
import { Link, useNavigate } from 'react-router-dom';
import Filter from '../ProductList/Filter';
import axios from 'axios';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { listAddresses } from '../../features/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../Constants';
import useTitle from '../../useTitle';
import Banner3 from '../../Assets/Banner3.png';
import OshoppeWorks from './OshoppeWorks';
const Navbar = () => {
    useTitle('Oshoppe is an Omni Channel D2C Brands Platform');
    const [isMenuOpen1, setIsMenuOpen1] = useState(false);
    const [defaultAddress, setDefaultAddress] = useState([]);
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState(null);
    const { addresses, isLoading } = useSelector((state) => state.address);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [error, setError] = useState('');
    const [guestAddress, setGuestAddress] = useState({
        city: null,
        pincode: null,
    });

    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleVerify = () => {
        const pincodePattern = /^[1-9][0-9]{5}$/;
        const isValidPincode = pincodePattern.test(pincode);
        if (isValidPincode) {
            setError('');
            // alert('Pincode is valid!');
        } else {
            setError('Pincode not valid!');
        }
    };

    const getLocation = () => {
        setLoading(true);
        // console.log('object');
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

                        // console.log('!!!!!', addressData);
                        setCity(addressData.city);
                        setPincode(addressData.pincode);
                        // setIsPopupOpen(false);

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
            console.log('Geolocation is not supported by your browser.');
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

    useEffect(() => {
        const c = sessionStorage.getItem('city');
        const p = sessionStorage.getItem('pincode');

        setGuestAddress({
            city: c,
            pincode: p,
        });
        // setIsPopupOpen(false);
    }, [setGuestAddress]);
    const handleSubmit = () => {
        const pincodePattern = /^[1-9][0-9]{5}$/;
        const isValidPincode = pincodePattern.test(pincode);

        if (!isValidPincode) {
            setError('Pincode not valid!');
            return;
        }
        sessionStorage.setItem('city', city);
        sessionStorage.setItem('pincode', pincode);
        const c = sessionStorage.getItem('city');
        const p = sessionStorage.getItem('pincode');
        //console.log(c, p);
        setGuestAddress({
            city: c,
            pincode: p,
        });
        // //console.log(guestAddress.city);
        // alert('Your location is saved!');
        setIsPopupOpen(false);
    };

    const handleClose = () => {
        setIsPopupOpen(false);
    };

    // if (!isPopupOpen) {
    //     return null;
    // }

    useEffect(() => {
        dispatch(listAddresses());
    }, [dispatch]);
    useEffect(() => {
        if (addresses && addresses.length > 0) {
            const filterAddress = addresses.filter(
                (address) => address.isDefault === true,
            );
            setDefaultAddress(filterAddress);
        }
    }, [addresses]);

    useEffect(() => {
        const fetchLoginDetails = async () => {
            try {
                let headers = {
                    Authorization: `Bearer ${localStorage.getItem(
                        'auth-token',
                    )}`,
                };
                let reqOptions = {
                    url: `${API_URL}/customer/detail`,
                    method: 'GET',
                    headers: headers,
                };
                let response = await axios.request(reqOptions);
                //console.log('loginDetails: ', response.data.data);

                setLoginDetails(response.data.data);
            } catch (error) {
                console.error('Error fetching login details:', error);
            }
        };

        fetchLoginDetails();
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('auth-token'),
    );
    const [searchQuery, setSearchQuery] = useState(''); // State to store search query
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('auth-token'));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsAuthenticated(false);
        navigate('/signin');
    };
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('auth-token'));
    }, [navigate]);

    const [dropdownOpen, setDropdownOpen] = useState({
        products: false,
        services: false,
        accessories: false,
    });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleDropdown = (dropdown) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }));
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form refresh
        if (!isAuthenticated && !guestAddress.pincode) {
            setIsPopupOpen(true);
            return;
        }
        try {
            let headers = {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            };
            const url = isAuthenticated
                ? `${API_URL}/customer/product/list`
                : `${API_URL}/guest/productList`;

            let reqOptions = {
                url: url,
                method: 'POST',
                headers: headers,
                data: {
                    ...(searchQuery ? { text: searchQuery } : {}),
                },
            };
            let response = await axios.request(reqOptions);
            //console.log('Search details: ', response.data.data.products);
            const products = response.data.data.products;
            // setFilteredProducts(products);
            // navigate('/products');
            // navigate('/products', { state: { products } });
            navigate(`/products?query=${encodeURIComponent(searchQuery)}`, {
                state: { products },
            });
        } catch (error) {
            console.error('Search field error:', error);
        }
    };
    const handleGoToHome = () => {
        setIsMenuOpen(false);
        navigate('/');
    };
    const handleGoToCart = () => {
        setIsMenuOpen(false);
        navigate('/cart');
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };
    const leftNavItems = [
        { label: 'Open Sponsorship', href: '#' },
        { label: 'Call Center', href: '#' },
        { label: 'Help', href: '#' },
        { label: 'Tutorial', href: '#' },
    ];

    // Be a Partner | Be an Advisor | Help | Videos | Call Centre | FAQ's | Careers | How Oshoppe works |
    // Founders | Our Team | Brand Building | Support | Reviews
    const rightNavItems = [
        { label: 'Be Partners', href: '#' },
        { label: 'Be an Advisor', href: '#' },
        { label: 'Help', href: '#' },
        { label: 'Videoes', href: '#' },
        { label: 'Call Center', href: '#' },
        { label: "FAQ's", href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'How Oshoppe works', href: '#' },
        { label: 'Founders', href: '#' },
        { label: 'Our Team', href: '#' },
        { label: 'Brand Building', href: '#' },
        { label: 'Support', href: '#' },
        { label: 'Reviews', href: '#' },
    ];

    const handleClick = (item) => {
        if (item.label === 'How Oshoppe works') {
            // navigate('/oshoppe-works');
            window.open('/oshoppe-works', '_blank');
        }
        if (item.label === 'Be an Advisor') {
            // navigate('/oshoppe-works');
            window.open('/be-an-advisor', '_blank');
        }
    };

    const handleGuestAddressChange = () => {
        // console.log('object');
        // if (!sessionStorage.getItem('pincode')) {
        // }
        setIsPopupOpen(true);
        const c = sessionStorage.getItem('city');
        const p = sessionStorage.getItem('pincode');

        setCity(c);
        setPincode(p);
        setGuestAddress({
            city: c,
            pincode: p,
        });
    };

    return (
        // !sessionStorage.getItem('pincode') &&
        <>
            {!isAuthenticated && isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    {/* <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"> */}
                    <div className="w-full max-w-md  p-6 bg-white rounded-lg shadow-lg">
                        {/* <div className="text-right">
                                <button
                                    onClick={handleClose}
                                    className="px-1 py-1 text-sm text-gray-700  rounded-lg hover:bg-gray-300 focus:outline-none"
                                >
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9c1e4fb612255943eac4158feb6ec4bd22fb1491781e95cc8a7cef092677e64?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                                        className="object-contain self-stretch my-auto w-6 aspect-square"
                                        alt=""
                                    />
                                </button>
                            </div> */}

                        <div className="flex z-0 flex-col px-6 mb-4 w-full text-lg leading-loose text-center text-gray-900 bg-white">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a02f31375a67c314b2906fed321a2110dd94b07e1675cca9899e59f31bacf3c2?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                                className="object-contain self-center w-12 rounded-3xl aspect-square"
                                alt="Location icon"
                            />
                            <h1 className="mt-4 w-full">
                                {/* Welcome to Oshoppe | Select pincode for Shopping */}
                                Allow Your Location
                            </h1>
                        </div>

                        <div className="mb-4 ">
                            <label className="block mb-1 text-sm font-medium text-gray-700 w-52">
                                City
                            </label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                                placeholder="City"
                            />
                        </div>

                        <div className="mb-4 ">
                            <label className="block mb-1 text-sm font-medium text-gray-700 w-36 items-center">
                                Pincode
                            </label>
                            <div className="flex justify-end">
                                <input
                                    type="text"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                    className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 justify-center"
                                    placeholder="Pincode"
                                />
                                <button
                                    onClick={handleVerify}
                                    className="ml-6 px-4 py-2 text-white bg-rose-800 rounded-lg hover:bg-rose-700 focus:outline-none"
                                >
                                    Check
                                </button>
                            </div>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-500">{error}</p>
                        )}

                        <div className="flex justify-center ">
                            <button
                                className="px-10 py-2 mt-4 w-full text-white rounded-md bg-rose-800 font-custom hover:bg-rose-700"
                                onClick={getLocation}
                            >
                                {loading ? 'Loading...' : 'Fetch my location'}
                            </button>
                        </div>
                        <div className="flex justify-between mt-1">
                            <button
                                onClick={handleClose}
                                className="px-10 w-1/2 py-2 mt-4 mr-4 text-gray-700 bg-zinc-200 rounded-lg hover:bg-zinc-100 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-10 py-2 mt-4 w-1/2 text-white bg-rose-800 rounded-lg hover:bg-rose-700 focus:outline-none"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="">
                {/* <header className="flex flex-wrap justify-between items-center py-3 pr-10 pl-10 text-xs text-black bg-[#E4CBBF] max-md:px-5">
                <nav className="flex gap-4 justify-center items-center self-stretch my-auto min-w-[240px]">
                    {leftNavItems.map((item, index) => (
                        <a
                            href={item.href}
                            className="self-stretch my-auto"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
                <nav className="flex gap-4 justify-center items-center self-stretch my-auto">
                    {rightNavItems.map((item, index) => (
                        <a
                            href={item.href}
                            className="self-stretch my-auto"
                        >
                            {item.label}
                        </a>
                    ))}
                    <button className="flex gap-0.5 justify-center items-center self-stretch my-auto whitespace-nowrap">
                        <span className="self-stretch my-auto">Download</span>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/958b2eba2850d56f0fc6ae7ee790f36d75b89074cfd76f823a9edd7801c30ab8?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                            className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                            alt=""
                        />
                    </button>
                </nav>
            </header> */}
                <div className="hidden sm:block">
                    <header className="flex justify-between items-center py-3 px-10 text-xs text-black bg-[#E4CBBF] max-md:px-5">
                        {/* Desktop Navbar */}
                        <nav className="hidden md:flex gap-4 justify-center items-center">
                            {/* {leftNavItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="hover:text-gray-700"
                                >
                                    {item.label}
                                </a>
                            ))} */}
                        </nav>
                        <nav className="hidden md:flex gap-4 justify-center items-center">
                            {rightNavItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="hover:text-gray-700"
                                    onClick={() => handleClick(item)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <button className="flex gap-1 items-center hover:text-gray-700">
                                <span>Download</span>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/958b2eba2850d56f0fc6ae7ee790f36d75b89074cfd76f823a9edd7801c30ab8?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                                    className="w-4 aspect-square"
                                    alt="Download icon"
                                />
                            </button>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden flex items-center"
                            onClick={() => setIsMenuOpen1(!isMenuOpen1)}
                        >
                            {isMenuOpen1 ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>

                        {/* Mobile Dropdown Menu */}
                        {isMenuOpen1 && (
                            <nav className="md:hidden absolute top-14 left-0 w-full bg-[#E4CBBF] flex flex-col items-start p-5 space-y-4 shadow-lg z-10">
                                {/* {leftNavItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="w-full text-left hover:text-gray-700"
                                    >
                                        {item.label}
                                    </a>
                                ))} */}
                                {rightNavItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="w-full text-left hover:text-gray-700"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <button className="flex gap-1 items-center hover:text-gray-700">
                                    <span>Download</span>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/958b2eba2850d56f0fc6ae7ee790f36d75b89074cfd76f823a9edd7801c30ab8?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                                        className="w-4 aspect-square"
                                        alt="Download icon"
                                    />
                                </button>
                            </nav>
                        )}
                    </header>
                </div>
                <header className="flex flex-wrap items-center gap-5 px-10 mt-2  max-md:px-5">
                    <div className="flex justify-center items-center h-full min-h-[38px] min-w-[300px] w-[360px]">
                        <button
                            className="block md:hidden text-gray-800 focus:outline-none mr-3"
                            onClick={toggleMenu}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <div
                            className="flex items-center justify-center cursor-pointer"
                            onClick={handleGoToHome}
                        >
                            <img
                                loading="lazy"
                                src={logo}
                                className="h-14 sm:h-20 md:h-14"
                                alt="Company logo"
                            />
                        </div>
                        <nav
                            className={`fixed inset-y-0 z-50 left-0 transform ${
                                isMenuOpen
                                    ? 'translate-x-0'
                                    : '-translate-x-full'
                            } transition-transform duration-200 ease-in-out bg-gray-100 w-64 md:hidden`}
                        >
                            <div className="flex flex-col gap-6 p-4">
                                <button
                                    className="self-end text-gray-800"
                                    onClick={toggleMenu}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                {/* Menu Items */}
                                <div className="flex flex-col gap-8">
                                    <button className="flex items-center gap-3 text-2xl">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/86396bfe1ef46a10fceb3a29f9f7d81504ee32f77a6f9f36a1b2ca6377ecc85a?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                            alt="Notification"
                                            className="w-6 h-6"
                                        />
                                        <span className="text-gray-800 text-xl">
                                            Notification
                                        </span>
                                    </button>
                                    <button className="flex items-center gap-3">
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6265ee8cc48b1d521efb2bc83c89f40bec3c1fc6f969ba187919a238fdbe536e?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                            alt="Profile"
                                            className="w-6 h-6"
                                        />
                                        <span className="text-gray-800 text-xl">
                                            PPP
                                        </span>
                                    </button>
                                    <button
                                        className="flex items-center gap-3"
                                        onClick={handleGoToCart}
                                    >
                                        <img
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd6784e86d60845d459083d45361df437d1fc80bd684e928565c69b4f944e58f?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                            alt="Cart"
                                            className="w-6 h-6"
                                        />
                                        <span className="text-gray-800 text-xl">
                                            Cart
                                        </span>
                                    </button>
                                </div>

                                <div>
                                    {!isAuthenticated ? (
                                        <Link
                                            to="/signin"
                                            className="block px-4 py-2 text-center text-white rounded bg-rose-800 hover:bg-red-700"
                                            onClick={toggleMenu}
                                        >
                                            Login
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col gap-8">
                                            <Link
                                                to="/profile"
                                                className="flex items-center"
                                                onClick={closeMenu}
                                            >
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8e1XkIN5Pa8yiLlgHusqgqpfL2WCXLO6XA&s"
                                                    alt="User profile"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div className="ml-2 text-gray-800">
                                                    <div className="text-xl">
                                                        {
                                                            loginDetails?.firstName
                                                        }
                                                    </div>
                                                    <div className="text-xs text-green-700">
                                                        Online
                                                    </div>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="flex items-center gap-3"
                                            >
                                                <img
                                                    src={logout1}
                                                    alt="Logout"
                                                    className="w-8 h-8"
                                                />
                                                <span className="text-gray-800 text-xl">
                                                    Logout
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </nav>

                        <div className="flex gap-2 items-center h-full text-sm text-neutral-800 w-[191px] ml-9">
                            <div className="flex gap- items-center my-auto w-[133px]">
                                <div
                                    className="hidden sm:block cursor-pointer"
                                    onClick={handleGuestAddressChange}
                                >
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/13e45d871215ea5b07a2fcf67ca9be0b972557e2f9c153419b130d897d5660e0?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                        className="object-contain shrink-0 aspect-square w-[18px]"
                                        alt=""
                                    />
                                </div>
                                <div className="">
                                    {!isAuthenticated ? (
                                        <div>
                                            <div
                                                onClick={
                                                    handleGuestAddressChange
                                                }
                                                className="cursor-pointer"
                                            >
                                                {guestAddress?.pincode && (
                                                    <>
                                                        {guestAddress?.city},{' '}
                                                        {guestAddress?.pincode}
                                                    </>
                                                )}
                                            </div>

                                            <div className="sm:hidden block">
                                                <Link
                                                    to="/signin"
                                                    className="block px-4 py-2 text-white rounded hover:bg-red-700 bg-rose-800"
                                                    onClick={toggleSidebar}
                                                >
                                                    Login
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {isAuthenticated &&
                                                defaultAddress[0] && (
                                                    <>
                                                        {
                                                            defaultAddress[0]
                                                                ?.city
                                                        }
                                                        ,{' '}
                                                        {
                                                            defaultAddress[0]
                                                                ?.pincode
                                                        }
                                                    </>
                                                )}
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="hidden sm:block cursor-pointer"
                                    onClick={handleGuestAddressChange}
                                >
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/71d5b7216eea2c4877a95943898b8e5ad25b0a667e579613bdcc94727801bc6c?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                        className="object-contain shrink-0 aspect-square w-[18px]"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center items-center self-stretch my-auto text-sm min-w-[240px] max-md:max-w-full">
                        <form
                            className="flex flex-wrap justify-center items-center self-stretch px-4 py-2 my-auto rounded-md border border-solid bg-zinc-50 border-neutral-200 lg:w-[460px] md:w-[250px] w-[350px] text-zinc-500  max-md:max-w-full"
                            onSubmit={handleSearch} // Form submission triggers search
                        >
                            <input
                                type="text"
                                placeholder="Search for Products on Oshoppe"
                                className="flex-grow bg-transparent outline-none px-2  md:px-3"
                                value={searchQuery} // Bind input to searchQuery state
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                aria-label="Search"
                            >
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/12f5766281191f5f5a080ff40b566124ecb716aacb0b4d89a2957969cb4e1e38"
                                    alt="Search"
                                    className="w-6"
                                />
                            </button>
                        </form>

                        {/* <div className="relative">
                        <label
                            htmlFor="categorySelect"
                            className="sr-only"
                        >
                            Select Category
                        </label>
                        <select
                            id="categorySelect"
                            className="flex items-center px-4 py-2.5 text-white bg-rose-800 rounded-md border border-transparent focus:border-rose-600 focus:ring focus:ring-rose-200"
                        >
                            <option value="">Select Category</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                            <option value="category3">Category 3</option>
                        </select>
                    </div> */}
                    </div>
                    <div className=" gap-16 items-center self-stretch my-auto min-w-[240px] hidden md:flex">
                        <div className="flex items-center self-stretch gap-12 my-auto">
                            <button>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/86396bfe1ef46a10fceb3a29f9f7d81504ee32f77a6f9f36a1b2ca6377ecc85a?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                    className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
                                    alt="notification"
                                />
                            </button>
                            <button>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6265ee8cc48b1d521efb2bc83c89f40bec3c1fc6f969ba187919a238fdbe536e?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                    className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
                                    alt=""
                                />
                            </button>
                            <button onClick={handleGoToCart}>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd6784e86d60845d459083d45361df437d1fc80bd684e928565c69b4f944e58f?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                    className="self-stretch object-contain w-6 my-auto shrink-0 aspect-square"
                                    alt="cart"
                                />
                            </button>
                        </div>

                        <div className="flex gap-7 justify-center self-stretch my-auto whitespace-nowrap w-[180px]">
                            {!isAuthenticated ? (
                                <Link
                                    to="/signin"
                                    className="block px-4 py-2 text-white rounded hover:bg-red-700 bg-rose-800"
                                    onClick={toggleSidebar}
                                >
                                    Login
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/profile"
                                        className="my-auto"
                                    >
                                        <div className="flex">
                                            <img
                                                loading="lazy"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8e1XkIN5Pa8yiLlgHusqgqpfL2WCXLO6XA&s"
                                                className="object-contain shrink-0  rounded-full aspect-square w-[35px]"
                                                alt="User profile"
                                            />
                                            <div className="flex flex-col w-[55px] my-auto ml-1">
                                                <div className="text-sm text-neutral-800">
                                                    {loginDetails?.firstName}
                                                </div>
                                                <div className="text-xs text-green-700">
                                                    Online
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/"
                                        className="block px-4 py-2 text-gray-800 "
                                        // onClick={() => navigate('/profile')}
                                    >
                                        <img
                                            src={logout1}
                                            alt=""
                                            onClick={handleLogout}
                                            className="w-10 h-10 cursor-pointer"
                                        />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* //IDEA:Sidebar Menu for Mobile  */}
                </header>
                <hr className="w-full mt-2 border-neutral-200" />
                {/*<Filter products={filteredProducts} />*/}
            </div>
        </>
    );
};

export default Navbar;

// <nav
//     className={`fixed inset-y-0 z-50 left-0 transform ${
//         isMenuOpen ? 'translate-x-0' : '-translate-x-full'
//     } transition-transform duration-200 ease-in-out bg-gray-100 w-64 md:hidden`}
// >
//     <div className="flex flex-col gap-6 p-4">
//         <button
//             className="self-end text-gray-800"
//             onClick={toggleMenu}
//         >
//             <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//             >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                 />
//             </svg>
//         </button>

//         {/* Menu Items */}
//         <div className="flex flex-col gap-8">
//             <button className="flex items-center gap-3 text-2xl">
//                 <img
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/86396bfe1ef46a10fceb3a29f9f7d81504ee32f77a6f9f36a1b2ca6377ecc85a?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
//                     alt="Notification"
//                     className="w-6 h-6"
//                 />
//                 <span className="text-gray-800 text-xl">
//                     Notification
//                 </span>
//             </button>
//             <button className="flex items-center gap-3">
//                 <img
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/6265ee8cc48b1d521efb2bc83c89f40bec3c1fc6f969ba187919a238fdbe536e?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
//                     alt="Profile"
//                     className="w-6 h-6"
//                 />
//                 <span className="text-gray-800 text-xl">
//                     PPP
//                 </span>
//             </button>
//             <button
//                 className="flex items-center gap-3"
//                 onClick={handleGoToCart}
//             >
//                 <img
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd6784e86d60845d459083d45361df437d1fc80bd684e928565c69b4f944e58f?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
//                     alt="Cart"
//                     className="w-6 h-6"
//                 />
//                 <span className="text-gray-800 text-xl">
//                     Cart
//                 </span>
//             </button>
//         </div>

//         <div className="mt-">
//             {!isAuthenticated ? (
//                 <Link
//                     to="/signin"
//                     className="block px-4 py-2 text-center text-white rounded bg-rose-800 hover:bg-red-700"
//                     onClick={toggleMenu}
//                 >
//                     Login
//                 </Link>
//             ) : (
//                 <div className="flex flex-col gap-8">
//                     <Link
//                         to="/profile"
//                         className="flex items-center"
//                     >
//                         <img
//                             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8e1XkIN5Pa8yiLlgHusqgqpfL2WCXLO6XA&s"
//                             alt="User profile"
//                             className="w-8 h-8 rounded-full"
//                         />
//                         <div className="ml-2 text-gray-800">
//                             <div className="text-xl">
//                                 {loginDetails?.firstName}
//                             </div>
//                             <div className="text-xs text-green-700">
//                                 Online
//                             </div>
//                         </div>
//                     </Link>
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-3"
//                     >
//                         <img
//                             src={logout1}
//                             alt="Logout"
//                             className="w-8 h-8"
//                         />
//                         <span className="text-gray-800 text-xl">
//                             Logout
//                         </span>
//                     </button>
//                 </div>
//             )}
//         </div>
//     </div>
// </nav>
