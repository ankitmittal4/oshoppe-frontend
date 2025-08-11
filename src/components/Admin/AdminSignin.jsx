import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../features/authSlice';
import logo from '../../Assets/logo1.svg';
import bgImage from '../../Assets/bg-image.png';
import groupLeft from '../../Assets/Groupleft.svg';
import groupRight from '../../Assets/Groupright.svg';
import { adminLogin } from '../../features/Admin/adminAuthSlice';

const AdminSignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error, admin } = useSelector((state) => state.adminAuth);

    const loginSchema = Yup.object({
        email: Yup.string()
            // email("Invalid email").
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: { email: '', password: '', rememberMe: false },
            validationSchema: loginSchema,
            onSubmit: (values) => {
                dispatch(adminLogin(values));
            },
        });
    // //console.log('++', values);

    useEffect(() => {
        if (admin) {
            navigate('/admin-dashboard');
        }
    }, [admin, navigate]);

    useEffect(() => {
        if (localStorage.getItem('admin-token')) {
            navigate('/admin-dashboard');
        }
    }, [navigate]);

    return (
        <div
            className="relative flex min-h-screen bg-fixed bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="flex flex-col mt-6 ml-5">
                <img
                    src={logo}
                    alt="Logo"
                    className="w-44 h-11"
                />
                <p className="text-white">The Future Of Omni Commerce</p>
            </div>

            <div className="absolute bottom-0 right-0 w-1/3 max-w-lg p-8 m-24 bg-white rounded-lg shadow-lg h-3/4">
                {/* <img src={groupLeft} className="absolute bottom-0 left-0" alt="" /> */}
                <img
                    src={logo}
                    alt="Logo"
                    className="w-40 mb-3 h-11"
                />
                <h2 className="text-2xl font-semibold text-left ">
                    Hi, Welcome
                </h2>
                <p className="mb-6 text-sm text-left">
                    Welcome back You've been missed!
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm text-black-600/80"
                        >
                            EMAIL/PHONE NUMBER
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-gray-500 bg-red-50"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm text-black"
                        >
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-gray-500 bg-red-50"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            className="mr-2"
                            checked={values.rememberMe}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <label
                            htmlFor="rememberMe"
                            className="text-sm text-gray-700 underline"
                        >
                            Remember Me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-1/3 block bg-[#7F0019] text-white p-2 rounded-md hover:bg-[#A70024] mx-auto"
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
            {/* <img src={groupRight} alt="" className="absolute top-0 right-0" /> */}
        </div>
    );
};

export default AdminSignIn;
