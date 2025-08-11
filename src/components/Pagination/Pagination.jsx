import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Pagination = ({
  totalProducts,
  productsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [pageNumbers, setPageNumbers] = useState([]);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3; // Number of pages to show before the ellipsis
    const left = currentPage - Math.floor(maxVisiblePages / 2);
    const right = currentPage + Math.floor(maxVisiblePages / 2);

    if (left > 2) {
      pages.push(1, "...");
    } else {
      for (let i = 1; i < left; i++) {
        pages.push(i);
      }
    }

    for (let i = Math.max(left, 1); i <= Math.min(right, totalPages); i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("...", totalPages);
    } else {
      for (let i = right + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    setPageNumbers(pages);
  };

  useEffect(() => {
    generatePageNumbers();
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center p-4">
      {/* <MdKeyboardArrowLeft onClick={onPageChange(setPageNumbers(pageNumbers-1))} className='text-xl cursor-pointer' /> */}

      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => number !== "..." && onPageChange(number)}
          className={`mx-1 px-3 py-1 border font-custom rounded-full ${
            number === currentPage
              ? "bg-red-800 text-white"
              : "bg-white text-black border-gray-300"
          } ${number === "..." ? "cursor-default" : "cursor-pointer"}`}
          disabled={number === "..."}
        >
          {number}
        </button>
      ))}
      {/* <MdKeyboardArrowRight onClick={onPageChange(setPageNumbers(pageNumbers+1))} className='text-xl cursor-pointer' /> */}
    </div>
  );
};

export default Pagination;
