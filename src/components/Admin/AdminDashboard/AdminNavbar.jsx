import React from 'react';
import logo from '../../../Assets/logo1.svg';
import profile_icon from '../../../Assets/profile.svg';
import notificaion_iocn from '../../../Assets/notification.svg';
import logout1 from '../../../Assets/logout.svg';
import search1 from '..//..//./../Assets/search.png';
import { FaBell, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/Admin/adminAuthSlice';
import { useDispatch } from 'react-redux';

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/adminlogin');
    };
    return (
        <nav className="fixed z-10 flex items-center justify-between w-full p-4 bg-white font-custom">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Logo"
                    className="mb-0 ml-3 h-11 w-44"
                />
            </div>
            <div className="flex items-center space-x-5">
                <div className="relative w-full">
                    <img
                        src={search1}
                        alt="Logo"
                        className="absolute w-3 h-3 transform -translate-y-1/2 left-3 top-1/2"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-2 pr-3 border border-gray-300 rounded-full pl-7 focus:outline-none w-96"
                    />
                </div>
                <img
                    src={notificaion_iocn}
                    alt=""
                    className="w-10 h-10"
                />
                <img
                    src={profile_icon}
                    alt=""
                    className="w-10 h-10"
                />
                <img
                    src={logout1}
                    alt=""
                    onClick={handleLogout}
                    className="w-10 h-10 cursor-pointer"
                />
                {/* <button
          className="px-4 py-2 text-white bg-green-600 rounded-full"
          onClick={handleLogout}
        >
          Logout
        </button> */}
            </div>
        </nav>
    );
};

export default AdminNavbar;
