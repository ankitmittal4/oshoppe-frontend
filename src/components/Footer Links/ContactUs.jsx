import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContactUs = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const formRef = useRef(null);

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Enter Full Name'),
        designation: Yup.string().required('Enter Designation'),
        city: Yup.string().required('Enter City'),
        postcode: Yup.string()
            .required('Enter Post Code')
            .matches(/^[0-9]{6}$/, 'PostCode should be exactly 6 digits'),
        contact: Yup.string()
            .required('Enter Contact Number')
            .matches(
                /^[0-9]{10}$/,
                'Contact number should be exactly 10 digits',
            ),
        email: Yup.string().required('Enter Email'),

        checkbox1: Yup.boolean().oneOf(
            [true],
            'Please confirm that you agree to the privacy policy.',
        ),
        checkbox2: Yup.boolean(),
        idea: Yup.string(),
    });

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
        initialValues: {
            fullName: '',
            designation: '',
            city: '',
            postcode: '',
            contact: '',
            email: '',
            checkbox1: false,
            checkbox2: false,
            idea: '',
        },
        validationSchema: validationSchema,

        onSubmit: (values, action) => {
            setPopupVisible(true);
            action.resetForm();
        },
    });

    const closePopup = () => setPopupVisible(false);

    return (
        <section className="flex flex-col grow shrink self-stretch px-6 py-8 my-auto mx-auto bg-white rounded-xl min-h-[700px] max-w-[880px] shadow-[0px_0px_8px_rgba(0,0,0,0.25)] w-full max-md:px-5 max-md:max-w-full">
            <header className="flex flex-col justify-center w-full max-md:max-w-full m">
                <h2 className="text-3xl text-neutral-800">
                    Oshoppe Customer Centre | Customer care support
                </h2>

                <div className="flex gap-x-20 mt-7 mb-3">
                    <div>
                        <p>Office Address</p>
                        <p>#4, First Floor, Kodi Krupa Complex, TC Palya</p>
                        <p>Main Road KR Puram, Bangalore - 560036</p>
                    </div>
                    <div>
                        <p>Customer Care Number</p>
                        <p>+91 7795453579</p>
                    </div>
                    <div>
                        <p>Email Id</p>
                        <p>Support@Oshopp.in</p>
                    </div>
                </div>
            </header>
            <div className="flex flex-col w-full rounded-xl max-md:max-w-full">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full max-md:max-w-full"
                >
                    <div className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full">
                        <label
                            htmlFor={'Full Name'
                                .toLowerCase()
                                .replace(/\s+/g, '-')}
                            className="sr-only"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            id={'Full Name'.toLowerCase().replace(/\s+/g, '-')}
                            placeholder="Full Name"
                            className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                            aria-label="Full Name"
                            name="fullName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fullName}
                        />
                        {touched.fullName && errors.fullName && (
                            <p className="text-xs italic text-red-500">
                                {errors.fullName}
                            </p>
                        )}
                    </div>
                    <div className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full">
                        <label
                            htmlFor={'Designation'
                                .toLowerCase()
                                .replace(/\s+/g, '-')}
                            className="sr-only"
                        >
                            Designation
                        </label>
                        <input
                            type="text"
                            id={'Designation'
                                .toLowerCase()
                                .replace(/\s+/g, '-')}
                            placeholder="Designation"
                            className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                            aria-label="Designation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.designation}
                        />
                        {touched.designation && errors.designation && (
                            <p className="text-xs italic text-red-500">
                                {errors.designation}
                            </p>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-6 items-start  w-full">
                        <div
                            className={`flex overflow-hidden flex-col pt-7  w-[48%] max-md:w-full`}
                        >
                            <label
                                htmlFor={'city'
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}
                                className="sr-only"
                            >
                                city
                            </label>
                            <input
                                type="text"
                                id={'city'.toLowerCase().replace(/\s+/g, '-')}
                                placeholder="City"
                                className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                                aria-label="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                            />
                            {touched.city && errors.city && (
                                <p className="text-xs italic text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div
                            className={`flex overflow-hidden flex-col pt-7  w-[48%] max-md:w-full`}
                        >
                            {/* <label
                            htmlFor={'postcode'
                                .toLowerCase()
                                .replace(/\s+/g, '-')}
                            className="sr-only"
                        >
                            postcode
                        </label> */}
                            <input
                                type="text"
                                id={'postcode'
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}
                                placeholder="Post Code"
                                className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                                aria-label="postcode"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.postcode}
                            />
                            {touched.postcode && errors.postcode && (
                                <p className="text-xs italic text-red-500">
                                    {errors.postcode}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full">
                        <label
                            htmlFor={'contact'
                                .toLowerCase()
                                .replace(/\s+/g, '-')}
                            className="sr-only"
                        >
                            Contact Phone
                        </label>
                        <input
                            type="text"
                            id={'contact'.toLowerCase().replace(/\s+/g, '-')}
                            placeholder="Contact Phone"
                            className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                            aria-label="contact"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.contact}
                        />
                        {touched.contact && errors.contact && (
                            <p className="text-xs italic text-red-500">
                                {errors.contact}
                            </p>
                        )}
                    </div>

                    <div className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full">
                        <label
                            htmlFor={'email'.toLowerCase().replace(/\s+/g, '-')}
                            className="sr-only"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id={'email'.toLowerCase().replace(/\s+/g, '-')}
                            placeholder="E-mail"
                            className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                            aria-label="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <p className="text-xs italic text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full">
                        <label
                            htmlFor={'idea'.toLowerCase().replace(/\s+/g, '-')}
                            className="sr-only"
                        >
                            idea
                        </label>
                        <input
                            type="text"
                            id={'idea'.toLowerCase().replace(/\s+/g, '-')}
                            placeholder="Let's talk about your idea"
                            className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                            aria-label="idea"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.idea}
                        />
                    </div>

                    <div className="flex flex-col pt-3 mt-2 w-full mt-4">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            aria-label="Upload File"
                        />
                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-full h-16 border-2 border-dashed border-zinc-500 text-center cursor-pointer"
                        >
                            Upload Additional File
                        </label>
                        <p className="text-xs">
                            Attach file. File size of your documents should not
                            exceed 10MB
                        </p>
                    </div>
                    <div className="flex items-center mt-7">
                        <input
                            type="checkbox"
                            name="checkbox1"
                            checked={values.checkbox1}
                            // onChange={(e) =>
                            //     setCheckboxChecked(e.target.checked)
                            // }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-4 h-4 text-red-600 border-gray-300 mr-2"
                        />

                        <span>
                            I confirm, I have read and agree to{' '}
                            <a
                                href="/privacy-policy"
                                target="_blank"
                                className="underline "
                            >
                                Oshoppe Privacy Policy
                            </a>{' '}
                            and consent to sharing my information
                        </span>
                    </div>
                    {touched.checkbox1 && errors.checkbox1 && (
                        <p className="text-xs italic text-red-500 mb-2">
                            {errors.checkbox1}
                        </p>
                    )}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="checkbox2"
                            checked={values.checkbox2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-4 h-4 text-red-600 border-gray-300 mr-2"
                            // readOnly={!!advisor}
                        />
                        <span>
                            I would like to receive alerts and updates from
                            Oshoppe
                        </span>
                    </div>
                    <div className="flex flex-col mt-6 w-full text-base text-white whitespace-nowrap max-md:max-w-full max-w-full">
                        <button
                            type="submit"
                            className="overflow-hidden gap-2 self-stretch px-5 py-2.5 bg-rose-800 rounded-lg border border-rose-800 border-solid shadow-sm max-md:max-w-full max-w-full w-full"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                        <h3 className="text-2xl mb-4">Success!</h3>
                        <p className="text-gray-700 mb-6">
                            Your details have been submitted successfully.
                        </p>
                        <button
                            onClick={closePopup}
                            className="px-4 py-2 bg-rose-800 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ContactUs;
