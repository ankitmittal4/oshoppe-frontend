import MultiRangeSlider from "multi-range-slider-react";
import React, { useEffect, useState } from "react";
import container from "..//..//Assets/container2.png";
import ProductCard from "./ProductCard";
// import MultiRangeSlider from 'multi-range-slider-react';
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

import starIcon from "..//..//Assets/star.svg";

const Sidebar = ({ onFilterChange }) => {
  // const [sections, setSections] = useState({
  //   price: true,
  //   brand: true,
  //   ratings: true,
  //   discount: true,
  //   color: true,
  //   application: true,
  //   finish: true,
  //   paintType: true,
  // });

  // const toggleSection = (section) => {
  //   setSections({ ...sections, [section]: !sections[section] });
  // };

  // const [filters, setFilters] = useState({
  //   price: [0, 10000],
  //   brands: [],
  //   ratings: [],
  //   discounts: [],
  //   colors: [],
  //   applications: [],
  //   finishes: [],
  //   paintTypes: [],
  // });

  // const handleFilterChange = (filterType, value) => {
  //   setFilters((prevFilters) => {
  //     const newFilters = { ...prevFilters };
  //     if (filterType === "price") {
  //       newFilters.price = value;
  //     } else {
  //       if (newFilters[filterType].includes(value)) {
  //         newFilters[filterType] = newFilters[filterType].filter(
  //           (item) => item !== value
  //         );
  //       } else {
  //         newFilters[filterType].push(value);
  //       }
  //     }
  //     onFilterChange(newFilters);
  //     return newFilters;
  //   });
  // };

  return (
    // <div className="bg-white w-full md:w-72 border border-neutral-200 rounded-xl m-4 font-custom">
    //   {/* Price Range */}

    //   <div className="mb-4 font-custom border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg cursor-pointer flex justify-between items-center text-black font-custom font-semibold"
    //       onClick={() => toggleSection("price")}
    //     >
    //       PRICE
    //       {sections.price ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.price && (
    //       <div className="mt-2">
    //         <MultiRangeSlider
    //           min={0}
    //           max={10000}
    //           step={10}
    //           minValue={filters.price[0]}
    //           maxValue={filters.price[1]}
    //           onInput={(e) =>
    //             handleFilterChange("price", [e.minValue, e.maxValue])
    //           }
    //           ruler={false}
    //           barInnerColor="green"
    //           label={false}
    //           style={{
    //             border: "none",
    //             boxShadow: "none",
    //             padding: "10px 0",
    //           }}
    //         />
    //         <div className="flex justify-between text-sm mt-2">
    //           <span>₹{filters.price[0]}</span>
    //           <span>₹{filters.price[1]}</span>
    //         </div>
    //       </div>
    //     )}
    //   </div>

    //   {/* Brand */}
    //   <div className="mb-4 border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("brand")}
    //     >
    //       BRAND
    //       {sections.brand ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.brand && (
    //       <div className="mt-2 text-zinc-600">
    //         {["Hextona", "Guher", "Asian", "Nerolac"].map((brand) => (
    //           <label className="block" key={brand}>
    //             <input
    //               type="checkbox"
    //               className="mr-4"
    //               checked={filters.brands.includes(brand)}
    //               onChange={() => handleFilterChange("brands", brand)}
    //             />
    //             {brand}
    //           </label>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {/* Ratings */}
    //   <div className="mb-4 border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("ratings")}
    //     >
    //       RATINGS
    //       {sections.ratings ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.ratings && (
    //       <div className="mt-2 text-zinc-600">
    //         {[1, 2, 3, 4, 5].map((star) => (
    //           <label className="block" key={star}>
    //             <div className="flex gap-2">
    //               <input
    //                 type="checkbox"
    //                 className="mr-2"
    //                 checked={filters.ratings.includes(star)}
    //                 onChange={() => handleFilterChange("ratings", star)}
    //               />
    //               {star} <img src={starIcon} alt="" /> & Above
    //             </div>
    //           </label>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {/* Discount */}
    //   <div className="mb-4 border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("discount")}
    //     >
    //       DISCOUNT
    //       {sections.discount ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.discount && (
    //       <div className="mt-2 text-zinc-600">
    //         {["70% & More", "60% & More", "50% & More", "40% & More"].map(
    //           (discount) => (
    //             <label className="block" key={discount}>
    //               <input
    //                 type="checkbox"
    //                 className="mr-4"
    //                 checked={filters.discounts.includes(discount)}
    //                 onChange={() => handleFilterChange("discounts", discount)}
    //               />
    //               {discount}
    //             </label>
    //           )
    //         )}
    //       </div>
    //     )}
    //   </div>

    //   {/* Color */}
    //   <div className="mb-4 border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("color")}
    //     >
    //       COLOR
    //       {sections.color ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.color && (
    //       <div className="mt-2 text-zinc-600">
    //         {[
    //           { name: "Red", color: "bg-red-500" },
    //           { name: "Orange", color: "bg-orange-500" },
    //           { name: "Yellow", color: "bg-yellow-500" },
    //           { name: "Green", color: "bg-green-500" },
    //           { name: "Mint", color: "bg-teal-500" },
    //           { name: "Purple", color: "bg-purple-500" },
    //         ].map((color) => (
    //           <label className="flex items-center gap-2" key={color.name}>
    //             <input
    //               type="checkbox"
    //               className="mr-2"
    //               checked={filters.colors.includes(color.name)}
    //               onChange={() => handleFilterChange("colors", color.name)}
    //             />
    //             <span className={`w-4 h-4 rounded-full ${color.color}`}></span>
    //             {color.name}
    //           </label>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {/* Application */}
    //   <div className="mb-4 border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("application")}
    //     >
    //       APPLICATION TYPE
    //       {sections.application ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.application && (
    //       <div className="mt-2 text-zinc-600 font-custom">
    //         {["Exterior", "Interior"].map((application) => (
    //           <label className="block" key={application}>
    //             <input
    //               type="checkbox"
    //               className="mr-2"
    //               checked={filters.applications.includes(application)}
    //               onChange={() =>
    //                 handleFilterChange("applications", application)
    //               }
    //             />
    //             {application}
    //           </label>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {/* Finish */}
    //   <div className="mb-4 border-b-2 border-neutral-200 p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("finish")}
    //     >
    //       FINISH
    //       {sections.finish ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.finish && (
    //       <div className="mt-2 text-zinc-600">
    //         {[
    //           "Eggshell",
    //           "Glassy",
    //           "HD",
    //           "High Glass",
    //           "Matte",
    //           "Pearl",
    //           "Satin",
    //           "Semi Glass",
    //           "Smooth",
    //         ].map((finish) => (
    //           <label className="block" key={finish}>
    //             <input
    //               type="checkbox"
    //               className="mr-4"
    //               checked={filters.finishes.includes(finish)}
    //               onChange={() => handleFilterChange("finishes", finish)}
    //             />
    //             {finish}
    //           </label>
    //         ))}
    //       </div>
    //     )}
    //   </div>

    //   {/* Paint Type */}
    //   <div className="mb-4  p-6">
    //     <h3
    //       className="text-lg font-semibold cursor-pointer flex justify-between items-center"
    //       onClick={() => toggleSection("paintType")}
    //     >
    //       PAINT TYPE
    //       {sections.paintType ? (
    //         <AiOutlineUp className="text-sm text-zinc-400" />
    //       ) : (
    //         <AiOutlineDown className="text-sm text-zinc-400" />
    //       )}
    //     </h3>
    //     {sections.paintType && (
    //       <div className="mt-2 text-zinc-600">
    //         {["Distemper", "Emulsion", "Enamel", "Functional", "Solvent"].map(
    //           (paintType) => (
    //             <label className="block" key={paintType}>
    //               <input
    //                 type="checkbox"
    //                 className="mr-4"
    //                 checked={filters.paintTypes.includes(paintType)}
    //                 onChange={() => handleFilterChange("paintTypes", paintType)}
    //               />
    //               {paintType}
    //             </label>
    //           )
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
    <></>
  );
};

export default Sidebar;

//
