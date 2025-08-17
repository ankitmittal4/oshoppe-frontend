import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Constants';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import paymentSuccess1 from '../../Assets/paymentSuccess1.svg';

const TransactionDetail = ({ label, value }) => (
    <div className="flex justify-between w-full">
        <span>{label}</span>
        <span className="text-right">{value}</span>
    </div>
);

const PaymentInvoice = () => {
    const navigate = useNavigate();
    const params = useParams();
    const orderId = params.id;
    const [detail, setDetail] = useState(null);
    const invoiceRef = useRef();

    const fetchPaymentDetail = async () => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/customer/order/paymentDetail`,
                method: 'POST',
                headers: headers,
                data: { orderId: orderId },
            };
            let response = await axios.request(reqOptions);
            setDetail(response.data.data);
            // console.log("Success", response.data.data);
            return response.data.data;
        } catch (error) {
            //console.log(error.response.data || error.message);
        }
    };
    useEffect(() => {
        fetchPaymentDetail();
    }, []);
    // console.log("Mode: ", detail?.paymentMode);
    const transactionDetails = [
        { label: 'Transaction Id', value: detail?.transactionId },
        { label: 'Payment Type', value: detail?.paymentMode?.toUpperCase() },
        { label: 'Phone Number', value: detail?.phoneNumber },
        { label: 'Email', value: detail?.email },
        { label: 'Amount Paid', value: '₹' + detail?.amount },
    ];

    const handleContinueShopping = () => {
        navigate('/');
    };
    const handleDownloadInoice = async () => {
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
        pdf.save(`invoice_${orderId}.pdf`);
    };

    return (
        <>
            <main
                className="flex mx-auto flex-col p-6 bg-white rounded-2xl max-w-[750px] shadow-[0px_4px_15px_rgba(0,0,0,0.15)] max-md:px-4"
                ref={invoiceRef}
            >
                <header className="flex flex-col items-center w-full">
                    <img
                        loading=""
                        src={paymentSuccess1}
                        alt="paymet Success"
                        className="w-20 h-20"
                    />
                    <h1 className="mt-2 text-2xl text-center text-black">
                        {detail?.customerName}
                    </h1>
                    <h2 className="text-lg text-green-600">
                        Payment Successfull
                    </h2>
                </header>

                <section className="flex flex-wrap gap-6 justify-between items-center mt-12 w-full text-lg leading-8 text-black max-md:mt-6">
                    {transactionDetails.map((detail, index) => (
                        <TransactionDetail
                            key={index}
                            label={detail.label}
                            value={detail.value}
                        />
                    ))}
                </section>
            </main>
            <footer className="flex flex-wrap gap-3 items-center mt-10 w-full text-lg tracking-wide text-center max-md:mt-6">
                <button
                    onClick={handleContinueShopping}
                    className="flex-grow px-6 py-2.5 bg-rose-800 rounded-lg shadow-[0px_0px_8px_rgba(10,77,204,0.1)] w-[150px] max-md:px-4 text-white"
                >
                    Continue Shopping
                </button>
                <button
                    onClick={handleDownloadInoice}
                    className="flex-grow px-6 py-2.5 bg-rose-800 rounded-lg shadow-[0px_0px_8px_rgba(10,77,204,0.1)] w-[150px] max-md:px-4 text-white"
                >
                    Download Invoice
                </button>
            </footer>
        </>
    );
};

export default PaymentInvoice;
