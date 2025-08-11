import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import ReactDOM from 'react-dom';
import SliderWrapper from '../Homepage/_SlickSliderStyle';
// import logo from "..//..//Assets/logo.svg";
import logo from '../../Assets/logo1.svg';
import loginBg from '..//..//Assets/Login-BG.jpg';
import frameBg from '..//..//Assets/frameBg.png';
import {
    Link,
    unstable_HistoryRouter,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLoginState } from '../../features/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from '../Tost/Tosts';
import useTitle from '../../useTitle';

const SignIn = () => {
    useTitle('Oshoppe Sign In');
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetLoginState());

        return () => {
            dispatch(resetLoginState());
        };
    }, [dispatch]);

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('auth-token'),
    );

    // const {
    //     isLoading,
    //     status,
    //     error,
    //     token,
    //     user,
    //     authStatus,
    //     loginMsg,
    //     loginSuccess,
    // } = useSelector((state) => state.auth);

    {
        /*****************login-taoset*********************/
    }
    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: '',
    });

    // useEffect(() => {
    //     if (status === 'succeeded') {
    //         setToast({
    //             visible: true,
    //             message: loginMsg,
    //             type: 'success',
    //             // type: loginSuccess ? "success" : "danger",
    //         });
    //         //console.log('loginSuccess: ', loginSuccess);
    //         if (loginSuccess) {
    //             setTimeout(() => {
    //                 setToast({ visible: false, message: '', type: '' });
    //             }, 3000);
    //         } else {
    //             setTimeout(() => {
    //                 setToast({ visible: false, message: '', type: '' });
    //             }, 3000); // Adjust the delay as needed
    //         }
    //     } else if (status === 'failed') {
    //         setToast({
    //             visible: true,
    //             message: loginMsg,
    //             type: 'danger',
    //         });
    //     }
    // }, [status, loginSuccess, loginMsg]);

    const closeToast = () => {
        setToast({ visible: false, message: '', type: '' });
    };

    {
        /*****************login-taoset-end*********************/
    }

    const loginSchema = Yup.object({
        email: Yup.string()
            // .email("Invalid email")
            // .matches(
            //   /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
            //   "Only Gmail addresses are allowed"
            // )
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    useEffect(() => {
        setTimeout(() => {
            if (!!localStorage.getItem('auth-token')) {
                const redirect = location.state?.from || '/';
                navigate(redirect);
            }
        }, 1);
    }, [localStorage.getItem('auth-token')]);

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setValues,
    } = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: loginSchema,

        onSubmit: (values, action) => {
            // setHomepage(true);
            dispatch(login(values));

            // if (status === 'succeeded') {
            //     //console.log('SUCCEEDED');
            //     setToast({
            //         visible: true,
            //         message: loginMsg,
            //         type: 'success',
            //         // type: loginSuccess ? "success" : "danger",
            //     });
            //     //console.log('loginSuccess: ', loginSuccess);
            //     if (loginSuccess) {
            //         setTimeout(() => {
            //             setToast({ visible: false, message: '', type: '' });
            //         }, 1000);
            //     } else {
            //         setTimeout(() => {
            //             setToast({ visible: false, message: '', type: '' });
            //         }, 1000); // Adjust the delay as needed
            //     }
            // } else if (status === 'failed') {
            //     //console.log('FAILED');
            //     setToast({
            //         visible: true,
            //         message: loginMsg,
            //         type: 'danger',
            //     });
            //     setTimeout(() => {
            //         setToast({ visible: false, message: '', type: '' });
            //     }, 1000);
            // }
            // action.resetForm();
        },
    });
    const { status, loginSuccess, loginMsg, isLoading } = useSelector(
        (state) => state.auth,
    );
    useEffect(() => {
        if (status === 'succeeded') {
            // setToast({
            //     visible: true,
            //     message: loginMsg,
            //     type: 'success',
            // });
            // setTimeout(() => {
            //     setToast({ visible: false, message: '', type: '' });
            // }, 2800);
        } else if (status === 'failed') {
            setToast({
                visible: true,
                message: loginMsg,
                type: 'danger',
            });
            setTimeout(() => {
                setToast({ visible: false, message: '', type: '' });
            }, 2000);
        }
    }, [status, loginMsg]);

    const slides = [
        {
            heading: 'Get Better with Money 1',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.',
        },
        {
            heading: 'Get Better with Money 2',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.',
        },
        ,
        {
            heading: 'Get Better with Money 3',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.',
        },
    ];

    var settings = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        speed: 500,
        arrows: false,
        adaptiveHeight: true,
        appendDots: (dots) => <ul>{dots}</ul>,
        customPaging: (i) => (
            <div className="ft-slick__dots--custom">
                <div className="loading" />
            </div>
        ),
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div
            className="flex min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${frameBg})` }}
        >
            {toast.visible && (
                // <Toast message="AAAA" type={toast.type} onClose={closeToast} />
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}

            {/* Right Section */}
            <div className="flex flex-col items-center justify-center w-full p-8 bg-white md:w-1/3  font-custom  rounded-md shadow-lg mx-auto my-auto ">
                <div className="w-full max-w-md">
                    <img
                        src={logo}
                        alt="Website Logo"
                        className="w-40 mb-3 h-11"
                    />
                    <h2 className="text-3xl font-semibold text-left">
                        Hi, Welcome
                    </h2>
                    <p className="mb-6 text-sm text-left">
                        Welcome back You've been missed!
                    </p>

                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm text-black-600/80"
                            >
                                Email/Phone Number
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-500 rounded-md outline-gray-500 bg-red-50"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.email}
                                </p>
                            ) : null}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm text-black"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border border-gray-500 rounded-md outline-gray-500 bg-red-50"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.password}
                                </p>
                            ) : null}
                        </div>

                        <button
                            type="submit"
                            className="w-1/3 block bg-[#7F0019] text-white p-2 rounded-md hover:bg-[#A70024] mx-auto"
                            onClick={handleSubmit}
                        >
                            {isLoading === true ? 'Loading...' : 'Login'}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-black">
                        Not registered yet ?{' '}
                        <span className="text-[#7F0019]">
                            <Link
                                to="/signup"
                                className="font-semibold underline"
                            >
                                Create An Account
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

//NOTE:/* Left Section */
/* <div
                className="relative hidden w-1/2 bg-center bg-cover lg:block"
                style={{ backgroundImage: `url(${frameBg})` }}
            ></div> */

// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import ReactDOM from 'react-dom';
// import SliderWrapper from '../Homepage/_SlickSliderStyle';
// // import logo from "..//..//Assets/logo.svg";
// import logo from '../../Assets/logo1.svg';
// import loginBg from '..//..//Assets/Login-BG.jpg';
// import frameBg from '..//..//Assets/Frame5.png';
// import { Link, unstable_HistoryRouter, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../features/authSlice';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Toast from '../Tost/Tosts';
// import axios from 'axios';

// const SignIn = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [isAuthenticated, setIsAuthenticated] = useState(
//         !!localStorage.getItem('auth-token'),
//     );

//     const {
//         isLoading,
//         status,
//         error,
//         token,
//         user,
//         authStatus,
//         loginMsg,
//         loginSuccess,
//     } = useSelector((state) => state.auth);

//     {
//         /*****************login-taoset*********************/
//     }
//     const [toast, setToast] = useState({
//         visible: false,
//         message: '',
//         type: '',
//     });

//     useEffect(() => {
//         if (status === 'succeeded') {
//             setToast({
//                 visible: true,
//                 message: loginMsg,
//                 type: 'success',
//                 // type: loginSuccess ? "success" : "danger",
//             });
//             //console.log('loginSuccess: ', loginSuccess);
//             if (loginSuccess) {
//                 setTimeout(() => {
//                     setToast({ visible: false, message: '', type: '' });
//                 }, 3000);
//                 // Adjust the delay as needed
//                 // localStorage.setItem("signupReload", "true");
//                 // window.location.reload();
//             } else {
//                 setTimeout(() => {
//                     setToast({ visible: false, message: '', type: '' });
//                 }, 3000); // Adjust the delay as needed
//             }
//         } else if (status === 'failed') {
//             setToast({
//                 visible: true,
//                 message: loginMsg,
//                 type: 'danger',
//             });
//         }
//     }, [status, loginSuccess, loginMsg]);

//     const closeToast = () => {
//         setToast({ visible: false, message: '', type: '' });
//     };

//     {
//         /*****************login-taoset-end*********************/
//     }

//     const loginSchema = Yup.object({
//         phone: Yup.number()
//             // .email("Invalid email")
//             // .matches(
//             //   /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
//             //   "Only Gmail addresses are allowed"
//             // )
//             .required('Phone Number is required'),
//         otp: Yup.number().required('OTP is required'),
//     });

//     useEffect(() => {
//         setTimeout(() => {
//             if (!!localStorage.getItem('auth-token')) {
//                 navigate('/');
//             }
//         }, 3000);
//     }, [localStorage.getItem('auth-token')]);

//     const {
//         values,
//         errors,
//         touched,
//         handleBlur,
//         handleChange,
//         handleSubmit,
//         setFieldValue,
//         setValues,
//     } = useFormik({
//         initialValues: { phone: '', otp: '' },
//         validationSchema: loginSchema,

//         onSubmit: (values, action) => {
//             // setHomepage(true);
//             //console.log('values: ', values);
//             dispatch(login(values));
//             // action.resetForm();
//         },
//     });

//     const slides = [
//         {
//             heading: 'Get Better with Money 1',
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.',
//         },
//         {
//             heading: 'Get Better with Money 2',
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.',
//         },
//         ,
//         {
//             heading: 'Get Better with Money 3',
//             description:
//                 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nulla id ex condimentum, sit amet blandit metus consectetur. Curabitur enim orci, commodo non ligula sed, rutrum dictum dolor.',
//         },
//     ];

//     var settings = {
//         dots: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         initialSlide: 0,
//         speed: 500,
//         arrows: false,
//         adaptiveHeight: true,
//         appendDots: (dots) => <ul>{dots}</ul>,
//         customPaging: (i) => (
//             <div className="ft-slick__dots--custom">
//                 <div className="loading" />
//             </div>
//         ),
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 3000); // Change slide every 3 seconds

//         return () => clearInterval(interval);
//     }, [slides.length]);

//     //IDEA: request otp api call
//     const handleRequestOtp = async (e) => {
//         e.preventDefault(); // Prevent form submission behavior

//         if (!values.phone) {
//             setToast({
//                 visible: true,
//                 message: 'Please enter a phone number',
//                 type: 'danger',
//             });
//             return;
//         }

//         try {
//             // Show toast or loader here (optional)
//             //console.log('%%****', values.phone);
//             const response = await axios.post(
//                 '${API_URL}/customer/requestOtp',
//                 {
//                     phone: values.phone,
//                 },
//             );

//             setToast({
//                 visible: true,
//                 message: 'OTP sent successfully!',
//                 type: 'success',
//             });

//             //console.log('OTP Request Response:', response.data);
//         } catch (error) {
//             console.error('Error requesting OTP:', error);

//             setToast({
//                 visible: true,
//                 message: error.response?.data?.message || 'Failed to send OTP',
//                 type: 'danger',
//             });
//         }
//     };

//     return (
//         <div className="flex min-h-screen">
//             {toast.visible && (
//                 // <Toast message="AAAA" type={toast.type} onClose={closeToast} />
//                 <Toast
//                     message={toast.message}
//                     type={toast.type}
//                     onClose={closeToast}
//                 />
//             )}
//             {/* Left Section */}
//             <div
//                 className="relative hidden w-1/2 bg-center bg-cover lg:block"
//                 style={{ backgroundImage: `url(${frameBg})` }}
//             ></div>

//             {/* Right Section */}
//             <div className="flex flex-col items-center justify-center w-full p-8 bg-white lg:w-1/2 font-custom">
//                 <div className="w-full max-w-md">
//                     <img
//                         src={logo}
//                         alt="Website Logo"
//                         className="w-40 mb-3 h-11"
//                     />
//                     <h2 className="text-3xl font-semibold text-left">
//                         Hi, Welcome
//                     </h2>
//                     <p className="mb-6 text-sm text-left">
//                         Welcome back You've been missed!
//                     </p>

//                     <form>
//                         <div className="flex mb-4 space-x-4">
//                             {/* <div className="w-1/2">
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm text-green-600/80"
//                 >
//                   FIRST NAME
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600 "
//                 />
//               </div>

//               <div className="w-1/2">
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm text-green-600/80"
//                 >
//                   LAST NAME
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   className="w-full px-3 py-2 border rounded-md border-green-600/30 bg-green-600/5 outline-green-600"
//                 />
//                </div>*/}
//                         </div>
//                         <div className="mb-4">
//                             <label
//                                 htmlFor="phone"
//                                 className="block text-sm text-black-600/80"
//                             >
//                                 PHONE NUMBER
//                             </label>
//                             <input
//                                 type="number"
//                                 id="phone"
//                                 className="w-full px-3 py-2 border border-gray-500 rounded-md outline-gray-500 bg-red-50"
//                                 value={values.phone}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                             />
//                             {errors.phone && touched.phone ? (
//                                 <p className="text-xs italic text-red-500">
//                                     {errors.phone}
//                                 </p>
//                             ) : null}
//                         </div>
//                         <button
//                             className="w-1/3 block bg-[#7F0019] text-white p-2 rounded-md hover:bg-[#A70024]"
//                             onClick={(e) => handleRequestOtp(e)}
//                         >
//                             Request OTP
//                         </button>
//                         <div className="mt-6 mb-4">
//                             <label
//                                 htmlFor="otp"
//                                 className="block text-sm text-black"
//                             >
//                                 OTP
//                             </label>
//                             <input
//                                 type="number"
//                                 id="otp"
//                                 className="w-full px-3 py-2 border border-gray-500 rounded-md outline-gray-500 bg-red-50"
//                                 value={values.otp}
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                             />
//                             {errors.otp && touched.otp ? (
//                                 <p className="text-xs italic text-red-500">
//                                     {errors.otp}
//                                 </p>
//                             ) : null}
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-1/3 block bg-[#7F0019] text-white p-2 rounded-md hover:bg-[#A70024] mx-auto"
//                             onClick={handleSubmit}
//                         >
//                             {isLoading === true ? 'Loading...' : 'Login'}
//                         </button>
//                     </form>

//                     {/*<p className="mt-4 text-center text-black">
//                         Not registered yet ?{' '}
//                         <span className="text-[#7F0019]">
//                             <Link
//                                 to="/signup"
//                                 className="font-semibold underline"
//                             >
//                                 CREATE AN ACCOUNT
//                             </Link>
//                         </span>
//                     </p>*/}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignIn;

// // try {
// //     let reqOptions = {
// //         url: '${API_URL}/customer/login',
// //         method: 'POST',
// //         data: userData,
// //     };

// //     let response = await axios.request(reqOptions);

// //     const data = response.data.data;

// //     //console.log(data);
// //     // localStorage.setItem('auth-token', data.accessToken);

// //     return response.data;
// // } catch (error) {
// //     //console.log(error.response.data);
// // }
