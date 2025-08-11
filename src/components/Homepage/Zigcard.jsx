import React from 'react';

const Card = ({ logo, title, subtitle }) => {
  return (
    <div className="w-full m-2 border border-neutral-200 shadow-md rounded-lg p-4 flex flex-col justify-center bg-neutral-100">
      <img src={logo} alt="Logo" className="w-16 h-16 mb-4" />
      <h2 className="font-custom text-xl font-semibold mb-2 text-green-600">{title}</h2>
      <p className="text-zinc-600 font-custom">{subtitle}</p>
    </div>
  );
};

export default Card;
