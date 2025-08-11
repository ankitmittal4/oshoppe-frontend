import React from 'react';
import logo from '../../Assets/logo1.svg';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-custom">
            {/* Header Section */}
            <header className="flex items-center p-6 bg-white shadow">
                <img
                    src={logo}
                    alt="Oshoppe Logo"
                    className="h-12 mr-auto"
                />
            </header>

            {/* Main Content */}
            <main className="container px-4 py-10 mx-auto max-w-5xl">
                {/* Title Section */}
                <h1 className="text-center text-3xl font-bold mb-2">
                    Terms and Conditions
                </h1>
                <p className="text-center text-sm mb-8">
                    Version: V 1.0 | Dated: 27 Oct. 24
                </p>

                {/* Introduction Section */}
                <p className="mb-4">
                    Welcome to Oshoppe, a product of Synvide Business Solutions
                    Private Limited. By accessing or using our services, you
                    agree to comply with and be bound by the following Terms and
                    Conditions. These apply to all users, including customers,
                    dealers, franchisees, and drop shippers. Please read them
                    carefully before engaging with Oshoppe.
                </p>

                {/* Terms and Conditions Details */}
                <div className="space-y-8 text-justify">
                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            1. General Terms
                        </h2>
                        <p>
                            <strong>1.1 Acceptance of Terms</strong> <br></br>{' '}
                            By using Oshoppe’s website, services, or entering
                            into any business arrangement with Oshoppe, you
                            agree to these Terms and Conditions. We may amend
                            these terms at any time, with or without prior
                            notice.
                        </p>
                        <p>
                            <strong>1.2 Eligibility</strong> <br></br> All users
                            must be at least 18 years old and legally capable of
                            entering into binding contracts.
                        </p>
                        <p>
                            <strong>1.3 Privacy Policy</strong> <br></br> Please
                            review our Privacy Policy, which outlines our
                            practices regarding the collection and use of your
                            personal information.
                        </p>
                        <p>
                            <strong>1.4 Intellectual Property</strong> <br></br>{' '}
                            All content, including trademarks, logos, product
                            images, and descriptions, are owned by or licensed
                            to Synvide Business Solutions. Unauthorized use of
                            any materials is strictly prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            2. For Customers
                        </h2>
                        <p>
                            <strong>2.1 Product Purchases</strong> <br></br>{' '}
                            When purchasing products from Oshoppe, customers
                            agree to pay the specified price, including taxes,
                            shipping fees, and any other applicable charges. All
                            prices are listed in Indian Rupees (INR) unless
                            otherwise specified.
                        </p>
                        <p>
                            <strong>2.2 Order Confirmation</strong> <br></br>{' '}
                            Upon placing an order, you will receive an order
                            confirmation email. The acceptance of your order
                            signifies the start of a binding agreement between
                            you and Synvide.
                        </p>
                        <p>
                            <strong>2.3 Returns and Refunds</strong> <br></br>{' '}
                            Customers may return products within 7 days of
                            delivery in accordance with our Returns and Refund
                            Policy. Products must be unused, in their original
                            packaging, and accompanied by a receipt or proof of
                            purchase.
                        </p>
                        <p>
                            <strong>2.4 Warranties</strong> <br></br> All
                            products sold on Oshoppe are covered by manufacturer
                            warranties. Oshoppe itself does not provide any
                            additional warranties unless explicitly stated. For
                            warranty claims, please contact support@oshoppe.com.
                        </p>
                        <p>
                            <strong>2.5 Limitation of Liability</strong>{' '}
                            <br></br> Oshoppe is not liable for any damages
                            resulting from the misuse of its products or
                            services. Our total liability to any customer will
                            not exceed the value of the purchase.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            3. For Dealers
                        </h2>
                        <p>
                            <strong>3.1 Dealer Agreement</strong> <br></br>{' '}
                            Dealers must sign a Dealer Agreement outlining
                            pricing, sales volume commitments, and territories
                            of operation. Synvide reserves the right to
                            terminate the agreement in case of non-compliance or
                            breach of terms.
                        </p>
                        <p>
                            <strong>3.2 Pricing and Discounts</strong> <br></br>{' '}
                            Dealers will receive access to special wholesale
                            pricing, which may be subject to periodic
                            adjustments. Dealers are responsible for adhering to
                            Oshoppe’s Minimum Advertised Price (MAP) policy.
                        </p>
                        <p>
                            <strong>3.3 Inventory and Payments</strong>{' '}
                            <br></br> Dealers are responsible for managing their
                            own inventory. Payments must be made on time as per
                            the terms of the Dealer Agreement, and failure to do
                            so may result in suspension or termination of the
                            dealership.
                        </p>
                        <p>
                            <strong>3.4 Marketing Support</strong> <br></br>{' '}
                            Synvide will provide approved marketing materials
                            and guidance to help dealers promote products
                            effectively. Any unauthorized use of Synvide
                            trademarks or branding is strictly prohibited.
                        </p>
                        <p>
                            <strong>3.5 Termination</strong> <br></br> Synvide
                            reserves the right to terminate a dealership
                            agreement with 30 days' notice if the dealer fails
                            to meet sales targets or engages in unethical
                            practices.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            4. For Franchisees
                        </h2>
                        <p>
                            <strong>4.1 Franchise Agreement</strong> <br></br>{' '}
                            All franchisees must enter into a Franchise
                            Agreement with Synvide, which includes specific
                            terms regarding franchise fees, royalties, and
                            operational guidelines.
                        </p>
                        <p>
                            <strong>4.2 Initial Investment and Fees</strong>{' '}
                            <br></br> Franchisees are required to invest the
                            stipulated initial amount, including franchise fees,
                            setup costs, and an ongoing royalty fee as outlined
                            in the Franchise Agreement.
                        </p>
                        <p>
                            <strong>3.3 Inventory and Payments</strong>{' '}
                            <br></br> Dealers are responsible for managing their
                            own inventory. Payments must be made on time as per
                            the terms of the Dealer Agreement, and failure to do
                            so may result in suspension or termination of the
                            dealership.
                        </p>
                        <p>
                            <strong>4.3 Branding and Marketing</strong>{' '}
                            <br></br> Franchisees must strictly adhere to
                            Oshoppe’s branding guidelines. Oshoppe will provide
                            marketing and promotional materials, but the
                            franchisee is responsible for local marketing
                            efforts.
                        </p>
                        <p>
                            <strong>4.4 Support and Training</strong> <br></br>{' '}
                            Franchisees will receive training and ongoing
                            support from Oshoppe. This includes operational
                            training, product knowledge, and guidance in
                            business development.
                        </p>
                        <p>
                            <strong>4.5 Termination and Renewal</strong>{' '}
                            <br></br> Oshoppe reserves the right to terminate
                            the franchise agreement for non-compliance or breach
                            of contract. Renewal of the agreement will depend on
                            performance and compliance with franchise standards.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            5. For Drop Shippers
                        </h2>
                        <p>
                            <strong>5.1 Drop Shipping Agreement</strong>{' '}
                            <br></br> Drop shippers must sign a Drop Shipping
                            Agreement, which includes specific terms regarding
                            product sourcing, shipping responsibilities, and
                            revenue sharing.
                        </p>
                        <p>
                            <strong>5.2 Order Fulfillment</strong> <br></br>{' '}
                            Oshoppe will handle order fulfillment for drop
                            shippers. However, drop shippers are responsible for
                            ensuring their storefronts are up to date and
                            accurate regarding product availability.
                        </p>
                        <p>
                            <strong>5.3 Payments and Fees</strong> <br></br>{' '}
                            Drop shippers will receive commissions based on
                            successful sales. All fees and payment schedules
                            will be outlined in the Drop Shipping Agreement.
                        </p>
                        <p>
                            <strong>5.4 Marketing and Promotion</strong>{' '}
                            <br></br> Drop shippers are encouraged to promote
                            Oshoppe products, but all marketing materials must
                            be approved by Oshoppe before use. Unauthorized
                            promotions or inaccurate representations of products
                            are prohibited.
                        </p>
                        <p>
                            <strong>5.5 Termination</strong> <br></br> Oshoppe
                            may terminate the Drop Shipping Agreement if the
                            drop shipper engages in unethical or fraudulent
                            practices.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            6. Liability and Indemnification
                        </h2>
                        <p>
                            <strong>6.1 Limitation of Liability</strong>{' '}
                            <br></br> To the fullest extent permitted by law,
                            Oshoppe is not liable for indirect, incidental,
                            special, or consequential damages arising from the
                            use of our services.
                        </p>
                        <p>
                            <strong>6.2 Indemnification</strong> <br></br>{' '}
                            Users, dealers, franchisees, and drop shippers agree
                            to indemnify and hold Oshoppe, its affiliates,
                            directors, officers, and employees harmless from any
                            claims, damages, losses, or expenses arising out of
                            your use of the services or breach of these terms.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            7. Governing Law
                        </h2>
                        <p>
                            These Terms and Conditions are governed by the laws
                            of India. Any disputes arising from these terms will
                            be subject to the exclusive jurisdiction of the
                            courts of Bengaluru, India.
                        </p>
                    </section>

                    {/* Add additional sections as per the terms */}

                    <section>
                        <h2 className="font-bold mb-2 text-xl">
                            8. Contact Information
                        </h2>
                        <p>
                            If you have any questions regarding these Terms and
                            Conditions, please contact us at{' '}
                            <a
                                href="mailto:legal@synvide.com"
                                className="text-blue-600 hover:underline"
                            >
                                legal@synvide.com
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TermsAndConditions;
