import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserDetails,
    updateUserDetails,
    resetUpdateUserState,
} from '../../features/authSlice';
import Toast from '../Tost/Tosts';
import useTitle from '../../useTitle';
const ProfileForm = () => {
    useTitle('Oshoppe Profile');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetUpdateUserState());

        return () => {
            dispatch(resetUpdateUserState());
        };
    }, [dispatch]);
    const {
        userData,
        userStatus,
        updateUserStatus,
        updateUserSuccess,
        // updatedData,
        updateUserMsg,
    } = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        alternatePhoneNumber: '',
        email: '',
        password: '',
        dob: '',
        gender: '',
    });

    const [isEditable, setIsEditable] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        alternatePhoneNumber: false,
        email: false,
        password: false,
        dob: false,
    });

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(getUserDetails());
        }
    }, [dispatch, userStatus]);

    useEffect(() => {
        if (userData) {
            const formatDOB = (dobString) => {
                if (!dobString) return '';
                const date = new Date(dobString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            setUser({
                firstName: userData.data.firstName || '',
                lastName: userData.data.lastName || '',
                phoneNumber: userData.data.phoneNumber || '',
                alternatePhoneNumber: String(
                    userData.data.alternatePhoneNumber || '',
                ),
                email: userData.data.email || '',
                password: '**********',
                dob: formatDOB(userData.data.dob) || '',
                gender: userData.data.gender || '',
            });
        }
    }, [userData]);

    const [toast, setToast] = useState({
        visible: false,
        message: '',
        type: '',
    });
    useEffect(() => {
        setToast({ visible: false, message: '', type: '' });
    }, []);

    const closeToast = () => {
        setToast({ visible: false, message: '', type: '' });
    };

    const profileSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: user,
            validationSchema: profileSchema,
            onSubmit: (values) => {
                //console.log('update profile', values);
                const userdata = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    alternatePhoneNumber: String(values.alternatePhoneNumber),
                    email: values.email,
                    password: values.password,
                    dob: values.dob,
                    gender: values.gender,
                };

                //console.log('userdata:$ ', userdata);
                dispatch(updateUserDetails(userdata));
            },
            enableReinitialize: true,
        });

    useEffect(() => {
        if (updateUserStatus === 'succeeded') {
            setToast({
                visible: true,
                message: updateUserMsg,
                // type: updateUserSuccess ? 'success' : 'danger',
                type: 'success',
            });
            dispatch(getUserDetails());
            setTimeout(() => {
                setToast({ visible: false, message: '', type: '' });
            }, 1000);
        } else if (updateUserStatus === 'failed') {
            setToast({
                visible: true,
                message: updateUserMsg,
                type: 'danger',
            });
            setTimeout(() => {
                setToast({ visible: false, message: '', type: '' });
            }, 3000);
        }
    }, [updateUserStatus, updateUserSuccess, updateUserMsg]);

    const handleEditClick = (field) => {
        setIsEditable((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };
    //console.log(updateUserMsg);
    return (
        <div>
            {userStatus === 'succeeded' ? (
                <form
                    onSubmit={handleSubmit}
                    className="p-1 md:mx-20 mx-1 space-y-4 bg-white font-custom"
                >
                    {toast.visible && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={closeToast}
                        />
                    )}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full px-3 py-2 bg-gray-100 border rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.firstName}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full px-3 py-2 bg-gray-100 border rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.lastName}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <label
                                    htmlFor="phoneNumber"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Primary Phone Number
                                </label>
                                {/* <button
                                    type="button"
                                    className="text-sm text-orange-500 "
                                    onClick={() =>
                                        handleEditClick('phoneNumber')
                                    }
                                >
                                    {isEditable.phoneNumber ? 'Save' : 'Edit'}
                                </button> */}
                            </div>

                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                className="w-full px-3 py-2 bg-gray-100 border rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.phoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isEditable.phoneNumber}
                            />
                            {errors.phoneNumber && touched.phoneNumber ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.phoneNumber}
                                </p>
                            ) : null}
                        </div>
                        <div>
                            <div className="flex justify-between">
                                <label
                                    htmlFor="alternatePhoneNumber"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Secondary Phone Number (Optional)
                                </label>
                            </div>

                            <input
                                type="text"
                                id="alternatePhoneNumber"
                                name="alternatePhoneNumber"
                                className="w-full px-3 py-2 bg-gray-100 rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.alternatePhoneNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.alternatePhoneNumber &&
                            touched.alternatePhoneNumber ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.alternatePhoneNumber}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 bg-gray-100 border rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isEditable.email}
                            />
                            {errors.email && touched.email ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.email}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <div className="flex justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-700"
                                >
                                    Password
                                </label>
                                {/* <button
                                    type="button"
                                    className="text-sm text-orange-500 "
                                    onClick={() => handleEditClick('password')}
                                >
                                    {isEditable.password ? 'Save' : 'Edit'}
                                </button> */}
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 bg-gray-100 border rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!isEditable.password}
                            />
                            {errors.password && touched.password ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.password}
                                </p>
                            ) : null}
                        </div>

                        <div>
                            <label
                                htmlFor="dateOfBirth"
                                className="block text-sm font-semibold text-gray-700"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                className="w-full px-3 py-2 bg-gray-100 border rounded-md outline-gray-400 sm:mb-0 md:mb-0 lg:mb-0 mb-3"
                                value={values.dob}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.dob && touched.dob ? (
                                <p className="text-xs italic text-red-500">
                                    {errors.dob}
                                </p>
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Gender
                            </label>
                            <div className="flex items-center mt-3 sm:mb-0 md:mb-0 lg:mb-0 mb-3">
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="M"
                                    checked={values.gender === 'M'}
                                    onChange={handleChange}
                                    className="w-4 h-4 mr-2 "
                                />
                                <label
                                    htmlFor="male"
                                    className="mr-4"
                                >
                                    Male
                                </label>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="F"
                                    checked={values.gender === 'F'}
                                    onChange={handleChange}
                                    className="w-4 h-4 mr-2"
                                />
                                <label htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 mt-4 text-white rounded-md bg-rose-800 font-custom hover:bg-rose-700"
                    >
                        {updateUserStatus === 'loading' ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Save Changes</p>
                        )}
                    </button>
                </form>
            ) : (
                <p>loading......</p>
            )}
        </div>
    );
};

export default ProfileForm;
