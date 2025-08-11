import React from 'react';
import logo from '../Assets/logo1.svg';
import facebook from '../Assets/facebook.svg';
import Twitter from '../Assets/twitter.svg';
import LinkedIn from '../Assets/linkedin.svg';

const Footer = () => {
    return (
        <footer className="py-10 bg-white font-custom text-neutral-800">
            <hr className="bg-black text-black border-black h-px" />

            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1  gap-4 md:gap-0">
                    {/* First Section */}
                    <div className="flex items-center justify-center p-2">
                        {/* <div>
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 mx-auto mb-4 w-36 md:mx-0"
                            />

                            <div className="text-center md:text-left">
                                <h4 className="mb-2 font-bold">Contact</h4>
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <p>info@oshoppe.in</p>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* Second Section */}
                    <div className="grid grid-cols-2 gap-8 p-4  sm:grid-cols-4 md:p-7 ">
                        <div>
                            <h4 className="mb-2 font-semibold text-black">
                                Home
                            </h4>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        About Oshoppe
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/contact-us"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Shop Now
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/terms-conditions"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Terms & Conditions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/privacy-policy"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold text-black">
                                Customer Support
                            </h4>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Connect to Advisor
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Track your Order
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/warranty"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Warranty Information
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/shipping-policy"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Shipping Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/return-refund"
                                        target="_blank"
                                        className="hover:underline"
                                    >
                                        Return & Refund Policy
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Raise Ticket
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-semibold text-black">
                                Make Money with Oshoppe
                            </h4>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Explore Business Opportunities
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Sell your Product on Oshoppe
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Become an Advisor
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2  font-semibold text-black">
                                Follow Us
                            </h4>
                            <ul>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        FaceBook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        YouTube
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:underline"
                                    >
                                        Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Section */}
            <hr className="bg-black text-black border-black h-px" />

            <div className="container px-4 mx-auto">
                <div className="pt-4   border-neutral-200">
                    <div className="flex flex-col items-center justify-between px-4  md:flex-row lg:px-24">
                        <div className=" md:mb-0 mb-4">
                            <a
                                href="terms-conditions"
                                target="_blank"
                                className="hover:underline"
                            >
                                V 1.0.2
                            </a>{' '}
                            {/* | */}
                            {/* <a
                                href="/privacy-policy"
                                target="_blank"
                                className="hover:underline"
                            >
                                {' '}
                                Privacy Policy
                            </a> */}
                        </div>
                        <div className="flex space-x-4 md:mb-0">
                            <a href="#">
                                <img
                                    src={facebook}
                                    alt="Facebook"
                                    className="w-8 h-8"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={Twitter}
                                    alt="Twitter"
                                    className="w-8 h-8"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={LinkedIn}
                                    alt="LinkedIn"
                                    className="w-8 h-8"
                                />
                            </a>
                        </div>
                        <div>
                            <p className="text-sm text-center md:text-left sm:mt-0 mt-4">
                                {/* © 2024 Synvide Business Solutions Pvt Ltd. */}
                                {/* Synvide V 1.0.0 */}
                                All Rights Reserved SYNVIDE BUSINESS SOLUTIONS
                                PRIVATE LIMITED
                                <br></br>
                                {/* All rights reserved. */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
