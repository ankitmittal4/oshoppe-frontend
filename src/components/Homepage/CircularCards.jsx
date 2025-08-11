import React from 'react';

const Card = ({ imageUrl, heading, description }) => {
  return (
    <div className=" w-72 h-72 sm:w-80 sm:h-80  bg-neutral-100 rounded-full shadow-md flex flex-col items-center justify-center overflow-hidden border border-neutral-200 relative font-custom">
      <div className=" h-48 sm:h-40 w-full absolute top-0">
        <img src={imageUrl} alt="Card Image" className="object-cover h-full w-full" />
      </div>
      <div className="text-center px-8 absolute bottom-16">
        <h2 className="text-xl font-semibold text-green-600">{heading}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
