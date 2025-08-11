import React, { useEffect, useState } from 'react';
import {
    FaUser,
    FaShoppingBag,
    FaCreditCard,
    FaHeart,
    FaMapMarkerAlt,
    FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Sidebar = ({ setRefreshKey }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('auth-token'),
    );

    const [selectedCategory, setSelectedCategory] = useState(
        localStorage.getItem('selectedCategory') || 'profile',
    );

    const menuItems = [
        { label: 'Profile', icon: FaUser, path: '', category: 'profile' },
        {
            label: 'Wishlist',
            icon: FaHeart,
            path: 'wishlist',
            category: 'wishlist',
        },
        {
            label: 'My Orders',
            icon: FaShoppingBag,
            path: 'orders',
            category: 'myorder',
        },
        {
            label: 'Join as Advisory',
            icon: FaCreditCard,
            path: 'advisor',
            category: '',
        },
        {
            label: 'Address',
            icon: FaMapMarkerAlt,
            path: 'address',
            category: 'address',
        },
        { label: 'Logout', icon: FaSignOutAlt, path: '/', category: 'logout' },
    ];

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('auth-token'));
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedCategory', selectedCategory);
    }, [selectedCategory]);

    const handleSelectCategory = (selected, path, label) => {
        if (label === 'Logout') {
            localStorage.removeItem('auth-token');
            setIsAuthenticated(false);
        }

        // Trigger refresh when "Wishlist" is clicked
        if (label === 'Wishlist') {
            setRefreshKey(Date.now());
        }

        setSelectedCategory(selected);
        navigate(path);
    };

    return (
        //NOTE:code 2
        <div className="font-custom">
            {/* Hamburger button for small screens */}
            <div className="lg:hidden p-4">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? (
                        <XIcon className="w-8 h-8 text-rose-800" /> // Close icon when menu is open
                    ) : (
                        <MenuIcon className="w-8 h-8 text-rose-800" /> // Hamburger icon
                    )}
                </button>
            </div>

            {/* Sidebar menu */}
            <div
                className={`fixed inset-0 w-3/4 h-screen bg-white z-40 p-4 transition-transform transform lg:transform-none ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:w-full lg:static lg:border lg:border-t-0 lg:border-zinc-200`}
            >
                <button
                    className="absolute top-4 right-4 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <XIcon className="w-8 h-8 text-rose-800" />
                </button>
                <ul className="mt-10">
                    {menuItems.map((item) => (
                        <li
                            key={item.label}
                            className={`flex items-center justify-between p-4 text-base font-normal cursor-pointer pl-10 rounded-md ${
                                selectedCategory === item.category
                                    ? 'bg-rose-800 text-white'
                                    : 'text-zinc-600'
                            }`}
                            onClick={() => {
                                handleSelectCategory(
                                    item.category,
                                    item.path,
                                    item.label,
                                );
                                setIsMenuOpen(false); // Close menu on item click
                            }}
                        >
                            <div className="flex items-center">
                                <item.icon className="mr-4" />
                                <span>{item.label}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        // <div className="w-full h-screen p-4 border border-t-0 lg:w-1/5 font-custom border-zinc-200">
        //     <ul>
        //         {menuItems.map((item) => (
        //             <li
        //                 key={item.label}
        //                 className={`flex items-center justify-between p-4 text-base font-normal cursor-pointer pl-10 rounded-md ${
        //                     selectedCategory === item.category
        //                         ? 'bg-rose-800 text-white'
        //                         : 'text-zinc-600'
        //                 }`}
        //                 onClick={() =>
        //                     handleSelectCategory(
        //                         item.category,
        //                         item.path,
        //                         item.label,
        //                     )
        //                 }
        //             >
        //                 <div className="flex items-center">
        //                     <item.icon className="mr-4" />
        //                     <span>{item.label}</span>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};

export default Sidebar;

// import React, { useEffect, useState } from 'react';
// import {
//     FaUser,
//     FaShoppingBag,
//     FaCreditCard,
//     FaHeart,
//     FaMapMarkerAlt,
//     FaSignOutAlt,
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(
//         !!localStorage.getItem('auth-token'),
//     );

//     // Load selected category from localStorage or default to 'profile'
//     const [selectedCategory, setSelectedCategory] = useState(
//         localStorage.getItem('selectedCategory') || 'profile',
//     );

//     const menuItems = [
//         { label: 'Profile', icon: FaUser, path: '', category: 'profile' },
//         {
//             label: 'Wishlist',
//             icon: FaHeart,
//             path: 'wishlist',
//             category: 'wishlist',
//         },
//         {
//             label: 'My Orders',
//             icon: FaShoppingBag,
//             path: 'orders',
//             category: 'myorder',
//         },
//         {
//             label: 'Join as Advisory',
//             icon: FaCreditCard,
//             path: 'advisor',
//             category: 'advisor',
//         },
//         {
//             label: 'Address',
//             icon: FaMapMarkerAlt,
//             path: 'address',
//             category: 'address',
//         },
//         { label: 'Logout', icon: FaSignOutAlt, path: '/', category: 'logout' },
//     ];

//     // Set authentication status on mount
//     useEffect(() => {
//         setIsAuthenticated(!!localStorage.getItem('auth-token'));
//     }, []);

//     // Save selected category to localStorage when it changes
//     useEffect(() => {
//         localStorage.setItem('selectedCategory', selectedCategory);
//     }, [selectedCategory]);

//     const handleSelectCategory = (selected, path, label) => {
//         if (label === 'Logout') {
//             localStorage.removeItem('auth-token');
//             setIsAuthenticated(false);
//         }
//         setSelectedCategory(selected);
//         navigate(path);
//     };

//     return (
//         <div className="w-full h-screen p-4 border border-t-0 lg:w-1/5 font-custom border-zinc-200">
//             <ul>
//                 {menuItems.map((item) => (
//                     <li
//                         key={item.label}
//                         className={`flex items-center justify-between p-4 text-base font-normal cursor-pointer pl-10 rounded-md ${
//                             selectedCategory === item.category
//                                 ? 'bg-rose-800 text-white'
//                                 : 'text-zinc-600'
//                         }`}
//                         onClick={() =>
//                             handleSelectCategory(
//                                 item.category,
//                                 item.path,
//                                 item.label,
//                             )
//                         }
//                     >
//                         <div className="flex items-center">
//                             <item.icon className="mr-4" />
//                             <span>{item.label}</span>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Sidebar;
