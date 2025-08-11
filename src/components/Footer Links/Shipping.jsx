import React from 'react';
import logo from '../../Assets/logo1.svg';

const ShippingPolicy = () => {
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
                        Oshoppe Shipping Policy
                    </h1>
                    <p className="text-sm text-gray-600">
                        {/* Version 1.0 dated 27 Oct 2024 */}
                    </p>
                </div>

                {/* Policy Content */}
                <div>
                    <p>
                        At Oshoppe, we strive to provide the best possible
                        shipping experience for all of our customers. Please
                        review our shipping policy below for more details.
                    </p>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            1. Shipping Timeframes:
                        </h2>
                        <div className="ml-4">
                            <ul className="list-disc ml-6">
                                <li>
                                    <span className="font-semibold">
                                        Minimum Delivery Time:{' '}
                                    </span>{' '}
                                    1 hour (For eligible express orders within
                                    our local delivery areas).
                                </li>
                            </ul>
                            <ul className="list-disc ml-6">
                                <li>
                                    <span className="font-semibold">
                                        Maximum Delivery Time:{' '}
                                    </span>{' '}
                                    10 days (For standard deliveries to remote
                                    or outstation locations).
                                </li>
                            </ul>
                        </div>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            2. Delivery Methods:
                        </h2>
                        <p>
                            We offer several shipping methods to ensure your
                            orders arrive as quickly as possible:
                        </p>
                        <ul className="list-disc ml-6">
                            <li>
                                <span className="font-semibold">
                                    Express Delivery:{' '}
                                </span>{' '}
                                Available for select products and regions, with
                                delivery within 1 hour.
                            </li>
                        </ul>
                        <ul className="list-disc ml-6">
                            <li>
                                <span className="font-semibold">
                                    Standard Delivery:{' '}
                                </span>{' '}
                                Typically delivered within 3 to 5 business days.
                            </li>
                        </ul>
                        <ul className="list-disc ml-6">
                            <li>
                                <span className="font-semibold">
                                    Extended Delivery:{' '}
                                </span>{' '}
                                For remote or outstation locations, deliveries
                                may take up to 10 business days.
                            </li>
                        </ul>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            3. Processing Time:
                        </h2>
                        <p>
                            Orders are processed within 1 to 2 business days.
                            Orders placed after 4 PM or on weekends may be
                            processed on the next business day.
                        </p>
                        {/* <ul className="list-disc ml-6">
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
                        </ul> */}
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            4. Shipping Costs:
                        </h2>
                        <p>
                            Shipping fees vary based on your location, order
                            size, and the chosen delivery method. You will be
                            able to see the total shipping cost during checkout.
                        </p>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">
                            5. Order Tracking:
                        </h2>
                        <p>
                            Once your order is dispatched, you will receive a
                            tracking number via email. You can use this number
                            to track your order's progress and estimated
                            delivery time.
                        </p>
                    </section>
                    <br />

                    <section>
                        <h2 className="font-semibold text-lg">6. Delays:</h2>
                        <p>
                            While we strive to meet the delivery times stated
                            above, there may be occasional delays due to
                            unforeseen circumstances, such as weather, carrier
                            delays, or public holidays. If your order is
                            delayed, you will be notified.
                        </p>
                    </section>
                    <br />
                    <section>
                        <h2 className="font-semibold text-lg">
                            7. Local Deliveries:
                        </h2>
                        <p>
                            For local deliveries, we offer expedited options
                            with deliveries as quick as 1 hour. Availability
                            depends on your location.
                        </p>
                    </section>
                    <br />
                    <section>
                        <h2 className="font-semibold text-lg">
                            8. Outstation Deliveries:
                        </h2>
                        <p>
                            For outstation orders, delivery times may vary
                            depending on distance and logistics. The maximum
                            delivery time for outstation deliveries is up to 10
                            business days.
                        </p>
                        <p>
                            We appreciate your understanding and thank you for
                            choosing Oshoppe! If you have any questions
                            regarding shipping, feel free to contact our
                            customer support team.
                        </p>
                    </section>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
