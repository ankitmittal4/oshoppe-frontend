import React from 'react';
import logo from '../../Assets/logo1.svg';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-black font-custom">
            {/* Header Section */}
            <header className="flex items-center p-6 bg-white shadow">
                <img
                    src={logo}
                    alt="Oshoppe Logo"
                    className="h-12 mr-auto"
                />
            </header>
            <div className="container px-4 py-10 mx-auto max-w-5xl">
                {/* Title Section */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Privacy Policy
                    </h1>
                    <p className="text-sm text-gray-600">
                        Version 1.0 dated 27 Oct 2024
                    </p>
                </div>

                {/* Policy Content */}
                <div>
                    <p>
                        Synvide Business Solutions Private Limited ("we", "our",
                        or "us") operates the Oshoppe platform (the “Service”).
                        This page informs you of our policies regarding the
                        collection, use, and disclosure of Personal Information
                        when you use our Service.
                    </p>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            1. Information Collection and Use
                        </h2>
                        <div className="ml-4">
                            <h3 className="font-medium text-black">
                                a. Personal Data
                            </h3>
                            <p>
                                When you sign up for our services or purchase
                                products, we may ask you to provide certain
                                personally identifiable information, including
                                but not limited to:
                            </p>
                            <ul className="list-disc ml-6">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Phone number</li>
                                <li>Address</li>
                                <li>
                                    Payment information (credit card, debit
                                    card, etc.)
                                </li>
                                <li>Location</li>
                            </ul>

                            <h3 className="font-medium mt-4 text-black">
                                b. Usage Data
                            </h3>
                            <p>
                                We collect information on how the Service is
                                accessed and used, including your IP address,
                                browser type, browser version, the pages of our
                                Service you visit, the time and date of your
                                visit, the time spent on those pages, and other
                                diagnostic data.
                            </p>

                            <h3 className="font-medium mt-4 text-black">
                                c. Cookies & Tracking Data
                            </h3>
                            <p>
                                We use cookies and similar tracking technologies
                                to track activity on our Service and hold
                                certain information. You can instruct your
                                browser to refuse cookies or to indicate when a
                                cookie is being sent. However, if you do not
                                accept cookies, you may not be able to use some
                                portions of our Service.
                            </p>
                        </div>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            2. Use of Data
                        </h2>
                        <p>
                            Oshoppe uses the collected data for various
                            purposes:
                        </p>
                        <ul className="list-disc ml-6">
                            <li>To provide and maintain the Service</li>
                            <li>To notify you about changes to our Service</li>
                            <li>To provide customer support</li>
                            <li>To monitor the usage of the Service</li>
                            <li>
                                To detect, prevent, and address technical issues
                            </li>
                            <li>
                                To process transactions and deliver products
                            </li>
                        </ul>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            3. Data Sharing and Disclosure
                        </h2>
                        <p>
                            We do not sell or share your personal data with
                            third parties for marketing purposes. However, we
                            may share your information with:
                        </p>
                        <ul className="list-disc ml-6">
                            <li>
                                Service providers who assist in the operation of
                                the platform (e.g., payment processors, shipping
                                services)
                            </li>
                            <li>
                                Legal authorities, if required by law or to
                                protect our legal rights
                            </li>
                            <li>
                                Business partners in case of mergers,
                                acquisitions, or partnerships
                            </li>
                        </ul>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            4. Data Security
                        </h2>
                        <p>
                            We take reasonable measures to protect your Personal
                            Information from unauthorized access, use, or
                            disclosure. However, no method of transmission over
                            the Internet is 100% secure.
                        </p>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            5. Your Data Protection Rights
                        </h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc ml-6">
                            <li>Access your data</li>
                            <li>Correct or update your data</li>
                            <li>Request deletion of your data</li>
                            <li>
                                Object to or restrict certain data processing
                                activities
                            </li>
                            <li>Withdraw consent where applicable</li>
                        </ul>
                        <p>
                            To exercise these rights, please contact us at{' '}
                            <span className="font-semibold">
                                Legal@oshoppe.in
                            </span>
                            .
                        </p>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            6. Changes to This Privacy Policy
                        </h2>
                        <p>
                            We may update our Privacy Policy from time to time.
                            You are advised to review this page periodically for
                            any changes.
                        </p>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">Contact Us</h2>
                        <p>
                            For inquiries or concerns about this Privacy Policy,
                            please contact us at:
                            <br />
                            <ul className="list-disc ml-6">
                                <li>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{' '}
                                    Legal@oshoppe.in
                                </li>
                            </ul>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
