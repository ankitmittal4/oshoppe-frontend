// src/components/Card.js
import React from "react";

const Card = ({ product, container }) => {
  return (
    <div className=" rounded-lg overflow-hidden flex flex-col font-custom">
      <img
        src={product?.images[0]}
        alt={""}
        className="w-full object-cover bg-white rounded-lg"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        {!container && (
          <div className="flex justify-between items-center mb-2">
            <div className="border border-amber-400 bg-amber-50 text-amber-400 rounded-full px-2 py-1 text-xs font-bold">
              {product?.discountPercentage} % off
            </div>
          </div>
        )}

        <h3 className="text-sm text-neutral-600">{product?.name}</h3>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-neutral-600 font-bold ">
            ₹{product?.sellingPrice}
          </span>
          {!container && (
            <span className="text-red-600 font-medium line-through">
              ₹{product?.mrp}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
