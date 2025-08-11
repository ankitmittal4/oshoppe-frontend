import React from 'react';
import logo from '../../Assets/logo1.svg';

const Warranty = () => {
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
                        Product Warranty Policy
                    </h1>
                    <p className="text-sm text-gray-600">
                        Version 1.0 dated 27 Oct 2024
                    </p>
                </div>

                {/* Policy Content */}
                <div className="">
                    <p>
                        At Oshoppe, we are committed to delivering high-quality
                        products to our customers. To ensure peace of mind, many
                        of our products come with a warranty. This document
                        outlines the terms and conditions of our product
                        warranties.
                    </p>
                    <br></br>

                    <section>
                        <h2 className="font-semibold text-lg">
                            1. Warranty Coverage
                        </h2>
                        <div className="ml-4">
                            <h3 className="font-medium text-black">
                                a. Warranty Period
                            </h3>
                            <p>
                                The warranty period for each product varies and
                                is specified on the product page at the time of
                                purchase. Warranty periods typically range from
                                6 months to 1 year, depending on the product
                                type and manufacturer.
                            </p>

                            <h3 className="font-medium mt-4 text-black">
                                b. What is Covered
                            </h3>
                            <p>
                                During the warranty period, Oshoppe or the
                                product manufacturer will repair or replace
                                products that exhibit material defects or
                                malfunctions under normal use conditions. The
                                warranty covers:
                            </p>
                            <ul className="list-disc ml-6">
                                <li>Manufacturing defects</li>
                                <li>Defects in materials or workmanship</li>
                                <li>Faulty components or systems</li>
                            </ul>

                            <h3 className="font-medium mt-4 text-black">
                                c. What is Not Covered
                            </h3>
                            <p>
                                The warranty does not cover damages resulting
                                from:
                            </p>
                            <ul className="list-disc ml-6">
                                <li>Normal wear and tear</li>
                                <li>Misuse, abuse, or improper handling</li>
                                <li>Unauthorized modifications or repairs</li>
                                <li>Failure to follow product instructions</li>
                                <li>
                                    Water or liquid damage (unless specifically
                                    designed for such conditions)
                                </li>
                                <li>
                                    Accidents, neglect, or environmental factors
                                </li>
                            </ul>
                        </div>
                    </section>
                    <br></br>

                    <section>
                        <h2 className="font-semibold text-lg">
                            2. Warranty Claim Process
                        </h2>
                        <div className="ml-4">
                            <h3 className="font-medium">
                                a. How to Submit a Warranty Claim
                            </h3>
                            <p>
                                If your product is still within the warranty
                                period and meets the eligibility criteria, you
                                can initiate a warranty claim by contacting our
                                customer service team. Please have the following
                                information ready:
                            </p>
                            <ul className="list-disc ml-6">
                                <li>
                                    Proof of purchase (order confirmation or
                                    receipt)
                                </li>
                                <li>
                                    Product details, including model and serial
                                    number (if applicable)
                                </li>
                                <li>A description of the issue or defect</li>
                            </ul>

                            <h3 className="font-medium mt-4">
                                b. Inspection and Service
                            </h3>
                            <p>
                                After receiving your claim, Oshoppe or the
                                manufacturer may inspect the product. If found
                                defective, we may repair or replace it, or offer
                                store credit if a replacement is unavailable.
                            </p>
                        </div>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            3. Repair Timeframe
                        </h2>
                        <p>
                            Repairs and replacements are generally completed
                            within 60 days, depending on the issue complexity
                            and part availability.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            4. Shipping Costs
                        </h2>
                        <ul className="list-disc ml-6">
                            <li>
                                <strong>Within Warranty:</strong> If eligible,
                                Oshoppe covers shipping costs. An advisor will
                                inspect and manage the claim on the customer's
                                behalf.
                            </li>
                            <li>
                                <strong>Out of Warranty:</strong> The customer
                                is responsible for all repair and shipping
                                costs.
                            </li>
                        </ul>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            5. Out-of-Warranty Service
                        </h2>
                        <p>
                            Oshoppe may assist with repair services for products
                            no longer under warranty. Costs for parts and labor
                            will be communicated before service.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            6. Transferability of Warranty
                        </h2>
                        <p>
                            The warranty is valid only for the original
                            purchaser and is non-transferable.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            7. Extended Warranty
                        </h2>
                        <p>
                            Extended warranty options may be available at
                            purchase. Refer to the specific document provided
                            for those terms.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            8. Manufacturer’s Warranty
                        </h2>
                        <p>
                            For products with manufacturer warranties, those
                            terms will apply. Please refer to the product
                            packaging or manufacturer's website for details.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            9. Limitations of Liability
                        </h2>
                        <p>
                            Oshoppe's liability is limited to repair or
                            replacement of the product. We are not liable for
                            indirect, incidental, or consequential damages
                            arising from product use.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">Contact Us</h2>
                        <p>
                            For inquiries or to initiate a warranty claim,
                            please contact us at:
                            <br />
                            <br></br>
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

export default Warranty;
