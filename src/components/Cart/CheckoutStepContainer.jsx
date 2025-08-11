import React, { useState } from 'react';

const CheckoutStepContainer = ({ children, isActive, isExpanded, onClick }) => {
    // Light color for other steps when not expanded
    const bgColor = isExpanded
        ? 'bg-red-500'
        : isActive
        ? 'bg-neutral-100'
        : 'bg-gray-50';
    const borderClass = isExpanded ? 'border-b border-neutral-200' : '';

    return (
        <div
            onClick={onClick}
            className={`ml-10 flex flex-col justify-center items-start px-6 mt-5 w-full rounded-md cursor-pointer  min-h-[70px] ${borderClass} max-md:px-5 max-md:max-w-full`}
        >
            {children}
        </div>
    );
};
export default CheckoutStepContainer;
