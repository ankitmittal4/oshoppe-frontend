import React from 'react';
import logo from '../../Assets/logo1.svg';

const ReturnRefundPolicy = () => {
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
                        Return and Refund Policy
                    </h1>
                    <p className="text-sm text-gray-600">
                        Version 1.0 dated 27 Oct 2024
                    </p>
                </div>

                {/* Policy Content */}
                <div className="">
                    <p>
                        At Oshoppe, we strive to ensure a satisfactory
                        experience for all our customers. However, if for any
                        reason you're not completely satisfied with your
                        purchase, we're here to help. This Return and Refund
                        Policy outlines the conditions under which returns,
                        exchanges, and refunds can be processed.
                    </p>
                    <br></br>

                    <section>
                        <h2 className="font-semibold text-lg">
                            1. Return Eligibility
                        </h2>

                        <div className="ml-4">
                            <h3 className="font-medium text-black">
                                a. Conditions for Returns
                            </h3>
                            <p>
                                You may return a product within 14 days of
                                receiving it if it meets the following
                                conditions:
                            </p>
                            <ul className="list-disc ml-6">
                                <li>
                                    The item must be unused, unwashed, and in
                                    the same condition as when you received it.
                                </li>
                                <li>
                                    The product must be in its original
                                    packaging, with all tags, manuals, and
                                    accessories intact.
                                </li>
                                <li>
                                    Proof of purchase (order confirmation or
                                    receipt) is required for processing any
                                    returns.
                                </li>
                            </ul>

                            <h3 className="font-medium mt-4 text-black">
                                b. Non-returnable Items
                            </h3>
                            <p>Certain items cannot be returned, including:</p>
                            <ul className="list-disc ml-6">
                                <li>
                                    Products that have been customized or
                                    personalized.
                                </li>
                                <li>
                                    Items that are perishable or have expired.
                                </li>
                                <li>
                                    Products that have been installed or used in
                                    any way.
                                </li>
                                <li>
                                    Digital products (e.g., e-gift cards,
                                    software downloads).
                                </li>
                            </ul>

                            <h3 className="font-medium mt-4 text-black">
                                c. Defective or Damaged Products
                            </h3>
                            <p>
                                If you received a defective or damaged item,
                                please notify us immediately upon receiving the
                                product at [Insert Contact Email] or [Phone
                                Number]. We will arrange for the product to be
                                inspected and will either replace the item or
                                process a refund.
                            </p>
                        </div>
                    </section>
                    <br></br>

                    <section>
                        <h2 className="font-semibold text-lg">
                            2. Return Process
                        </h2>
                        <div className="ml-4">
                            <h3 className="font-medium">
                                a. How to Initiate a Return
                            </h3>
                            <p>
                                To initiate a return, please contact our
                                customer service team at [Insert Contact Email]
                                or [Phone Number] within the eligible return
                                period. Our team will guide you through the
                                process, including providing a return
                                authorization and shipping instructions.
                            </p>

                            <h3 className="font-medium mt-4">
                                b. Return Shipping
                            </h3>
                            <p>
                                For eligible returns, you will be responsible
                                for the return shipping costs unless the return
                                is due to an error on our part (e.g., incorrect
                                item shipped, defective product). If the product
                                qualifies for return due to our error, Oshoppe
                                will cover the return shipping costs.
                            </p>
                            <h3 className="font-medium mt-4">
                                c. Inspection and Approval
                            </h3>
                            <p>
                                Once your return is received and inspected, we
                                will notify you of the approval or rejection of
                                your return. The approval process typically
                                takes 5-7 business days after the product is
                                received.
                            </p>
                        </div>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">3. Refunds</h2>
                        <div className="ml-4">
                            <h3 className="font-medium mt-">
                                a. Refund Method
                            </h3>
                            <p>
                                If your return is approved, your refund will be
                                processed, and the amount will be credited to
                                your original method of payment within 7-10
                                business days. Refunds may take longer to appear
                                in your account depending on your bank or
                                payment provider’s policies.
                            </p>
                            <h3 className="font-medium text-black mt-4">
                                b. Partial Refunds
                            </h3>
                            <p>
                                In certain situations, only partial refunds are
                                granted:
                            </p>
                            <ul className="list-disc ml-6">
                                <li>
                                    Products with missing parts, manuals, or
                                    accessories.
                                </li>
                                <li>
                                    Items that are returned after 14 days but
                                    within 30 days of purchase may be subject to
                                    a restocking fee.
                                </li>
                            </ul>
                            <h3 className="font-medium mt-4">
                                c. Non-refundable Items
                            </h3>
                            <p>
                                Shipping charges and installation fees are
                                non-refundable, except in cases where Oshoppe
                                made an error in your order or the item was
                                defective upon delivery.
                            </p>
                        </div>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">4. Exchanges</h2>
                        <p>
                            If you need to exchange a product for a different
                            size, model, or color, you may do so by following
                            the same process outlined in the "Return Process"
                            section. Exchanges are subject to stock
                            availability.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            5. Cancellations
                        </h2>
                        <div className="ml-4">
                            <h3 className="font-medium text-black">
                                a. Order Cancellation
                            </h3>
                            <p>
                                You may cancel your order within 24 hours of
                                placing it for a full refund. After this period,
                                if your order has already been processed or
                                shipped, you will need to follow the return
                                process once the item is delivered.
                            </p>
                            <h3 className="font-medium text-black mt-4">
                                b. Refund for Cancellations
                            </h3>
                            <p>
                                For eligible cancellations, refunds will be
                                processed within 7-10 business days to the
                                original payment method.
                            </p>
                        </div>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">
                            6. Late or Missing Refunds
                        </h2>
                        <p>
                            If you haven’t received a refund after the
                            stipulated processing time, please first check with
                            your bank or credit card provider. If you've done
                            this and still haven’t received your refund, please
                            contact us at Legal@oshoppe.in.
                        </p>
                    </section>
                    <br></br>
                    <section>
                        <h2 className="font-semibold text-lg">Contact Us</h2>
                        <p>
                            If you have any questions about our Return and
                            Refund Policy, please reach out to us at:
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

export default ReturnRefundPolicy;
