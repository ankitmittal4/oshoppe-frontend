import React, { useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../Assets/logo1.svg';
import { fetchSubOrderDetail } from '../../features/OrderSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
const Invoice = () => {
    const params = useParams();
    const subOrderId = params.id;
    const invoiceRef = useRef();
    const dispatch = useDispatch();
    const { subOrderDetail } = useSelector((state) => state.suborderDetail);

    useEffect(() => {
        dispatch(fetchSubOrderDetail(subOrderId));
    }, [dispatch]);

    const handleDownloadPDF = async () => {
        const element = invoiceRef.current;
        if (!element) return;
        const canvas = await html2canvas(element);
        const imageData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4',
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imageData, 'PNG', 0, 0, width, height);
        pdf.save(`invoice_${subOrderId}.pdf`);
    };

    return (
        <div>
            <div className="flex justify-end">
                <button
                    onClick={handleDownloadPDF}
                    className="btn btn-primary px-4 py-2 mt-4 text-white rounded-md bg-gray-700 font-custom hover:bg-gray-600"
                >
                    Download Invoice
                </button>
            </div>
            <div ref={invoiceRef}>
                <div className="h-3"></div>
                <div className="flex items-center justify-center cursor-pointer">
                    <img
                        loading="lazy"
                        src={logo}
                        className="object-contain h-12"
                        alt="Company logo"
                    />
                </div>
                <section className="flex flex-col overflow-hidden bg-white max-w-[75%] justify-center items-center mx-auto mt-10">
                    <header className="gap-8 self-stretch px-3.5 py-3.5 w-full text-base leading-none text-white bg-[#A70024] rounded-t-xl max-md:max-w-full text-center font-semibold">
                        Sold By
                    </header>
                    <div className="flex flex-wrap gap-10 justify-between items-center px-3.5 py-3 w-full border border-black border-solid min-h-[30px] max-md:max-w-full">
                        <div className="self-stretch my-auto text-md font-semibold leading-none text-black">
                            Shop Name
                        </div>
                        <div className="flex justify-between items-start self-stretch my-auto w-[39%]">
                            <div className="text-md leading-none text-black">
                                {subOrderDetail?.dealerShopName}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 py-3 justify-between items-center px-3.5 py-2 w-full border border-black border-solid min-h-[30px] max-md:max-w-full border-t-0">
                        <div className="self-stretch my-auto text-md font-semibold leading-none text-black">
                            Shop Address
                        </div>
                        <div className="flex justify-between items-start self-stretch my-auto w-[39%]">
                            <div className="text-md leading-none text-black">
                                {subOrderDetail?.dealerShopAddress}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 py-3 justify-between items-center px-3.5 w-full border border-black border-solid min-h-[30px] max-md:max-w-full border-t-0">
                        <div className="self-stretch my-auto text-md font-semibold leading-none text-black">
                            Invoice Number
                        </div>
                        <div className="flex justify-between items-start self-stretch my-auto w-[39%]">
                            <div className="text-md leading-none text-black">
                                {subOrderDetail?.invoiceId}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 py-3 justify-between items-center px-3.5 w-full border border-black border-solid min-h-[30px] max-md:max-w-full border-t-0">
                        <div className="self-stretch my-auto text-md font-semibold leading-none text-black">
                            Invoice Date
                        </div>
                        <div className="flex justify-between items-start self-stretch my-auto w-[39%]">
                            <div className="text-md leading-none text-black">
                                {subOrderDetail?.invoiceDate.slice(0, 10)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 py-3 justify-between items-center px-3.5 w-full border border-black border-solid min-h-[30px] max-md:max-w-full border-t-0">
                        <div className="self-stretch my-auto text-md font-semibold leading-none text-black">
                            Order Id
                        </div>
                        <div className="flex justify-between items-start self-stretch my-auto w-[39%]">
                            <div className="text-md leading-none text-black">
                                {subOrderDetail?.subOrderFormatId}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-10 py-3 justify-between items-center px-3.5 w-full border border-black border-solid min-h-[30px] max-md:max-w-full border-t-0">
                        <div className="self-stretch my-auto text-md font-semibold leading-none text-black">
                            Payment Mode
                        </div>
                        <div className="flex justify-between items-start self-stretch my-auto w-[39%]">
                            <div className="text-md leading-none text-black">
                                {subOrderDetail?.paymentMode?.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-wrap gap-10  pr-10 mt-5 bg-white border-solid rounded-lg py-7 max-w-[75%] justify-center ">
                    <article className="flex flex-col self-stretch my-auto min-w-[240px] w-[388px]">
                        <h2 className="text-xl leading-none text-red-700">
                            Delivery Address
                        </h2>
                        <div className="flex flex-col justify-center w-full mt-6 text-md">
                            <header className="flex flex-col w-full">
                                <h3 className="text-lg leading-none text-zinc-900">
                                    {subOrderDetail?.customerName}
                                </h3>
                                <p className="mt-3 leading-5 text-gray-500"></p>
                            </header>
                            <div className="flex items-center w-full mt-3 leading-none">
                                <span className="self-stretch my-auto text-zinc-900">
                                    Phone Number:
                                </span>
                                <span className="self-stretch my-auto ml-1 text-gray-500">
                                    {subOrderDetail?.phoneNumber}
                                </span>
                            </div>
                            <div className="flex items-center w-full mt-3 leading-none">
                                <span className="self-stretch my-auto text-zinc-900">
                                    Email:
                                </span>
                                <span className="self-stretch my-auto ml-1 text-gray-500">
                                    {subOrderDetail?.email}
                                </span>
                            </div>
                            <div className="flex items-center w-full mt-3 leading-none">
                                <span className="self-stretch my-auto text-zinc-900">
                                    Address:{' '}
                                </span>
                                <span className="self-stretch my-auto ml-1 text-gray-500">
                                    {subOrderDetail?.city}
                                    {', '}
                                    {subOrderDetail?.state}
                                    {', '}
                                    {subOrderDetail?.pincode}
                                </span>
                            </div>
                        </div>
                    </article>
                </section>
                <section className="flex flex-col overflow-hidden bg-white max-w-[75%] justify-center items-center mx-auto mt-6">
                    <header className="gap-8 self-stretch px-3.5 py-3.5 w-full text-base leading-none text-white bg-[#A70024] rounded-t-xl max-md:max-w-full text-center font-semibold">
                        Invoice Summary
                    </header>
                    <table className="w-full text-sm text-black border border-collapse border-black">
                        <thead>
                            <tr>
                                <th className="px-2 py-3 border border-black">
                                    S.No.
                                </th>
                                <th className="px-2 py-1 border border-black">
                                    Product Name
                                </th>
                                <th className="px-2 py-1 border border-black">
                                    Unit Price exclusive Tax
                                </th>
                                <th className="px-2 py-1 border border-black">
                                    Quantity
                                </th>
                                <th className="px-2 py-1 border border-black">
                                    CGST
                                </th>
                                <th className="px-2 py-1 border border-black">
                                    SGST
                                </th>
                                <th className="px-2 py-1 border border-black w-20">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center border border-black">
                                <td className="py-3 border border-black">1</td>
                                <td className="border border-black pb-4">
                                    {subOrderDetail?.name}
                                </td>
                                <td className="border border-black">
                                    <span className="font-sans">₹</span>
                                    {(subOrderDetail?.price / 1.05).toFixed(2)}
                                </td>
                                <td className="border border-black">
                                    {subOrderDetail?.numberOfProducts}
                                </td>
                                <td className="border border-black">
                                    {(
                                        (subOrderDetail?.price -
                                            subOrderDetail?.price / 1.05) *
                                        0.5
                                    ).toFixed(2)}
                                </td>
                                <td className="border border-black">
                                    {(
                                        (subOrderDetail?.price -
                                            subOrderDetail?.price / 1.05) *
                                        0.5
                                    ).toFixed(2)}
                                </td>
                                <td className="border border-black">
                                    <span className="font-sans">₹</span>
                                    {subOrderDetail?.totalAmount}
                                </td>
                            </tr>
                            <tr className="text-center border border-black font-semibold">
                                <td
                                    className="border border-black text-right pr-5 py-3"
                                    colSpan="6"
                                >
                                    Sub Total
                                </td>
                                <td className="border border-black">
                                    <span className="font-sans">₹</span>
                                    {subOrderDetail?.totalAmount}
                                </td>
                            </tr>
                            <tr className="text-center border border-black font-semibold">
                                <td
                                    className="border border-black text-right pr-5 py-3"
                                    colSpan="6"
                                >
                                    Shipping Charge
                                </td>
                                <td className="border border-black">
                                    <span className="font-sans">₹</span>
                                    {subOrderDetail?.deliveryCharges}
                                </td>
                            </tr>
                            <tr className="text-center border border-black font-semibold">
                                <td
                                    className="border border-black text-right pr-5 py-3"
                                    colSpan="6"
                                >
                                    Total
                                </td>
                                <td className="border border-black">
                                    <span className="font-sans">₹</span>
                                    {subOrderDetail?.totalAmount +
                                        subOrderDetail?.deliveryCharges}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <div className="flex bg-white max-w-[75%] justify-between items-center mx-auto mt-16 mb-10 pb-10">
                    <div>
                        <p>For any help Contact: Customersupport@oshoppe.com</p>
                        <p>
                            Note: Payment Through Synvide business solutions
                            Pvt. Ltd.
                        </p>
                    </div>
                    <div>
                        <p>For Username</p>
                        <p>Authorized Signtaure</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
