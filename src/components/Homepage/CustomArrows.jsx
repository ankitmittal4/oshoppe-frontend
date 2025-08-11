import React from 'react';

export const NextArrow = ({ onClick }) => {
  return (
    <div
      className="custom-next-arrow bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-0 right-5 w-8 h-8 z-10"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div>
  );
};

export const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="custom-prev-arrow bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center cursor-pointer absolute bottom-0 right-14 w-8 h-8 z-10"
      onClick={onClick}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </div>
  );
};
