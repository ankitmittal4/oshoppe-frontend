import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAdvisor, detailAdvisor } from '../../features/advisorSlice';
import { useSelector, useDispatch } from 'react-redux';
import useTitle from '../../useTitle';
const validationSchema = Yup.object({
    pincode: Yup.number()
        .typeError('Servicing Pincode must be a number')
        .required('Servicing Pincode is required')
        .test(
            'len',
            'Pincode must be exactly 6 digits',
            (val) => val && val.toString().length === 6,
        ),
    qualification: Yup.string().required('Qualification is required'),
    jobDescription: Yup.string().required('Job Description is required'),
    serveEntirePincode: Yup.boolean().required(
        'Please select a serving pincode',
    ),
    workMode: Yup.boolean().required('Mode is required'),
    // apartmentName: Yup.string().required('Apartment is required'),
    // location: Yup.string().required('Location is required'),
    apartmentName: Yup.string().when('serveEntirePincode', {
        is: false,
        then: (schema) => schema.required('Apartment Name is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
    location: Yup.string().when('serveEntirePincode', {
        is: false,
        then: (schema) => schema.required('Location is required'),
        otherwise: (schema) => schema.notRequired(),
    }),
});

const AdvisorForm = () => {
    useTitle('Become An Oshoppe Advisor today and earn higher profits');
    const dispatch = useDispatch();
    const { advisor, isLoading, error } = useSelector((state) => state.advisor);
    useEffect(() => {
        dispatch(detailAdvisor());
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
            pincode: '',
            qualification: '',
            jobDescription: '',
            serveEntirePincode: true,
            apartmentName: '',
            location: '',
            workMode: '',
        },
        validationSchema,
        onSubmit: (values) => {
            //console.log('Form Values', values);
            dispatch(addAdvisor(values));
            resetForm();
        },
    });
    useEffect(() => {
        if (advisor) {
            //console.log('LL', advisor);
            setValues({
                pincode: advisor.pincode || '',
                qualification: advisor.qualification || '',
                jobDescription: advisor.jobDescription || '',
                serveEntirePincode: advisor.serveEntirePincode ?? false,
                apartmentName: advisor.apartmentName || '',
                location: advisor.location || '',
                workMode: advisor.workMode ?? false,
            });
        }
    }, [advisor, setValues]);
    return (
        <div className="px-6 bg-white border border-solid rounded-lg border-neutral-200">
            <header className="flex flex-col mt-4">
                <h1 className="text-2xl font-semibold text-zinc-900">
                    Become An Oshoppe Advisor today and earn higher profits
                </h1>
                <p className="mt-2.5 text-base leading-7 text-zinc-500">
                    {/* Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. */}
                </p>
            </header>
            {advisor && (
                <div className="p-4 mt-6 mb-0 text-green-700 bg-green-100 border border-green-300 rounded">
                    Your Application has been submitted successful, Our team
                    will contact you for further information
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col pt-5 pb-2.5"
            >
                <section className="flex flex-wrap items-center gap-4 mt-6">
                    <div className="flex w-full max-md:flex-col gap-1.5">
                        <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                            <label>Servicing Pincode</label>
                            <spanc className="text-lg text-center text-red-500">
                                *
                            </spanc>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Servicing Pincode"
                                className={`block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md 
                            ${
                                advisor
                                    ? 'bg-gray-200 border-none outline-none focus:outline-none'
                                    : 'focus:outline-blue-900'
                            }`}
                                value={values.pincode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!!advisor}
                            />
                            {errors.pincode && touched.pincode && (
                                <p className="text-xs text-red-500">
                                    {errors.pincode}
                                </p>
                            )}
                        </div>

                        <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                            <label>Qualification</label>
                            <spanc className="text-lg text-center text-red-500">
                                *
                            </spanc>
                            <input
                                type="text"
                                name="qualification"
                                placeholder="Qualification"
                                className={`block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md 
                            ${
                                advisor
                                    ? 'bg-gray-200 border-none outline-none'
                                    : 'focus:outline-blue-900'
                            }`}
                                value={values.qualification}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!!advisor}
                            />
                            {errors.qualification && touched.qualification && (
                                <p className="text-xs text-red-500">
                                    {errors.qualification}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                <div className="flex flex-col w-full mt-5 max-md:max-w-full">
                    <label
                        htmlFor="jobDescription"
                        className="text-lg text-zinc-900"
                    >
                        Interests/Skills
                        <spanc className="text-lg text-center text-red-500">
                            *
                        </spanc>
                    </label>
                    <textarea
                        name="jobDescription"
                        placeholder="Job Description"
                        className={`w-full px-3.5 pt-2.5 pb-14 bg-white rounded-lg border shadow-sm min-h-[90px] text-gray-600 resize-none 
                    ${
                        advisor
                            ? 'bg-[#E5E7EB] border-none outline-none bg-zinc-200'
                            : 'focus:outline-blue-900'
                    }`}
                        value={values.jobDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={!!advisor}
                    ></textarea>
                    {errors.jobDescription && touched.jobDescription && (
                        <p className="text-xs text-red-500">
                            {errors.jobDescription}
                        </p>
                    )}
                </div>

                <fieldset className="flex flex-wrap w-full mt-3 max-md:max-w-full">
                    <label>Like to serve entire Pincode</label>
                    <spanc className="text-lg text-center text-red-500">
                        *
                    </spanc>
                    <div className="flex items-center gap-2 ml-5">
                        <input
                            type="radio"
                            id="yes"
                            name="serveEntirePincode"
                            value="true"
                            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                            // onChange={handleChange}
                            onChange={() => {
                                handleChange({
                                    target: {
                                        name: 'serveEntirePincode',
                                        value: true,
                                    },
                                });
                            }}
                            onBlur={handleBlur}
                            checked={values.serveEntirePincode === true} // Check for boolean
                            disabled={!!advisor}
                        />
                        <label
                            htmlFor="yes"
                            className="text-sm text-slate-700"
                        >
                            Yes
                        </label>
                    </div>

                    <div className="flex items-center gap-2 ml-10">
                        <input
                            type="radio"
                            id="no"
                            name="serveEntirePincode"
                            value="false"
                            className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                            // onChange={handleChange}
                            onChange={() => {
                                handleChange({
                                    target: {
                                        name: 'serveEntirePincode',
                                        value: false,
                                    },
                                });
                            }}
                            onBlur={handleBlur}
                            checked={values.serveEntirePincode === false} // Check for boolean
                            disabled={!!advisor}
                        />
                        <label
                            htmlFor="no"
                            className="text-sm text-slate-700"
                        >
                            No
                        </label>
                    </div>
                </fieldset>

                {errors.serveEntirePincode && touched.serveEntirePincode && (
                    <p className="text-xs text-red-500">
                        {errors.serveEntirePincode}
                    </p>
                )}

                <div className="mt-5">
                    <label className="flex items-center gap-2">
                        <fieldset className="flex flex-wrap w-full mt-3 max-md:max-w-full">
                            <label>Work Mode</label>
                            <spanc className="text-lg text-center text-red-500">
                                *
                            </spanc>
                            <div className="flex items-center gap-2 ml-5">
                                <input
                                    type="radio"
                                    id="yes1"
                                    name="workMode"
                                    value="true"
                                    className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                                    // onChange={handleChange}
                                    onChange={() => {
                                        handleChange({
                                            target: {
                                                name: 'workMode',
                                                value: true,
                                            },
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    checked={values.workMode === true} // Check for boolean
                                    disabled={!!advisor}
                                />
                                <label
                                    htmlFor="yes1"
                                    className="text-sm text-slate-700"
                                >
                                    Full Time
                                </label>
                            </div>

                            <div className="flex items-center gap-2 ml-10">
                                <input
                                    type="radio"
                                    id="no1"
                                    name="workMode"
                                    value="false"
                                    className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-600"
                                    // onChange={handleChange}
                                    onChange={() => {
                                        handleChange({
                                            target: {
                                                name: 'workMode',
                                                value: false,
                                            },
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    checked={values.workMode === false} // Check for boolean
                                    disabled={!!advisor}
                                />
                                <label
                                    htmlFor="no1"
                                    className="text-sm text-slate-700"
                                >
                                    Part Time
                                </label>
                            </div>
                        </fieldset>
                    </label>
                </div>

                {!values.serveEntirePincode && (
                    <section className="flex flex-wrap items-center gap-4 mt-6">
                        <div className="flex w-full max-md:flex-col gap-1.5">
                            <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                                <label>Apartment Name</label>
                                <spanc className="text-lg text-center text-red-500">
                                    *
                                </spanc>
                                <input
                                    type="text"
                                    name="apartmentName"
                                    placeholder="Apartment Name"
                                    className={`block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md 
                            ${
                                advisor
                                    ? 'bg-gray-200 border-none outline-none'
                                    : 'focus:outline-blue-900'
                            }`}
                                    value={values.apartmentName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    readOnly={!!advisor}
                                />
                                {errors.apartmentName &&
                                    touched.apartmentName && (
                                        <p className="text-xs text-red-500">
                                            {errors.apartmentName}
                                        </p>
                                    )}
                            </div>

                            <div className="lg:w-1/2 md:w-1/2 sm:w-1/2 w-full">
                                <label>Location</label>
                                <spanc className="text-lg text-center text-red-500">
                                    *
                                </spanc>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    className={`block w-full px-2 py-2 mt-1 text-gray-600 border rounded-md 
                            ${
                                advisor
                                    ? 'bg-gray-200 border-none outline-none'
                                    : 'focus:outline-blue-900'
                            }`}
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    readOnly={!!advisor}
                                />
                                {errors.location && touched.location && (
                                    <p className="text-xs text-red-500">
                                        {errors.location}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                <button
                    type="submit"
                    className={`self-start px-6 py-2 mt-6 text-xl leading-tight text-white rounded-md bg-rose-800 max-md:px-5 transition-opacity duration-200 ${
                        advisor
                            ? 'bg-gray-300 cursor-not-allowed  text-gray-300 opacity-45 '
                            : 'hover:bg-rose-900'
                    }`}
                    disabled={!!advisor}
                >
                    Submit Form
                </button>
            </form>
        </div>
    );
};

export default AdvisorForm;
