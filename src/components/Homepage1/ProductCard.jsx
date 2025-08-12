import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAGE_URL } from '../../Constants';
const ProductCard = ({
    _id,
    images,
    category,
    name,
    sellingPrice,
    quantity,
    shortDescription,
}) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('auth-token'),
    );
    const handleClick = () => {
        if (!isAuthenticated && !sessionStorage.getItem('pincode')) {
            window.location.reload();
            return;
        }
        navigate(`products/${_id}`);
    };

    return (
        <article
            className="flex flex-col items-center self-stretch pb-4 my-auto bg-white rounded-lg border border-solid border-neutral-200 min-h-[330px] w-[200px] cursor-pointer"
            onClick={handleClick}
        >
            {/* <div className="flex overflow-hidden flex-col  items-center px-6 py-4 max-w-full bg-gray-200 rounded-lg w-[216px] max-md:px-5"> */}
            <img
                loading="lazy"
                src={`${IMAGE_URL}${images[0]}`}
                alt={name?.slice(0, 10)}
                className=" aspect-[0.71] w-[200px] h-[150px]"
            />
            {/* </div> */}
            <div className="flex flex-col mt-4 w-48 max-w-full">
                <div className="flex flex-col justify-between w-full min-h-[59px]">
                    <div className="text-xs text-zinc-500">{category}</div>
                    <h3 className="mt-1 text-base font-medium leading-5 text-neutral-800">
                        {shortDescription.slice(0, 20)}
                        {/* {name.slice(0, 20)} */}
                    </h3>
                </div>
                <div className="flex flex-col justify-between mt-3.5 w-full h-[55px]">
                    <div className="flex-1 shrink self-stretch w-full text-3xl text-rose-800 whitespace-nowrap">
                        <span className="font-sans">₹</span> {sellingPrice}
                    </div>
                    <div className="flex gap-4 justify-center items-center mt-3 w-full">
                        <div className="flex flex-col justify-center self-stretch py-px my-auto rounded-md w-[122px]">
                            <div className="flex flex-col justify-center items-start py-px rounded-md bg-zinc-100 max-md:pr-5">
                                <div className="flex z-10 shrink-0 rounded-md h-[9px] w-[69px]" />
                            </div>
                        </div>
                        <div className="self-stretch my-auto text-xs text-zinc-500">
                            {quantity} Sold
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;

// import React from 'react';
// const ProductCard = ({ image, category, title, price, soldCount }) => {
//     return (
//         <article className="flex flex-col items-center self-stretch pb-4 my-auto bg-white rounded-lg border border-solid border-neutral-200 min-h-[330px] w-[200px]">
//             <div className="flex overflow-hidden flex-col justify-center items-center px-6 py-4 max-w-full bg-gray-200 rounded-lg w-[216px] max-md:px-5">
//                 <img
//                     loading="lazy"
//                     src={image}
//                     alt={title}
//                     className="object-contain aspect-[0.71] w-[88px]"
//                 />
//             </div>
//             <div className="flex flex-col mt-4 w-48 max-w-full">
//                 <div className="flex flex-col justify-between w-full min-h-[59px]">
//                     <div className="text-xs text-zinc-500">{category}</div>
//                     <h3 className="mt-1 text-base font-medium leading-5 text-neutral-800">
//                         {title}
//                     </h3>
//                 </div>
//                 <div className="flex flex-col justify-between mt-3.5 w-full h-[55px]">
//                     <div className="flex-1 shrink self-stretch w-full text-3xl text-rose-800 whitespace-nowrap">
//                         {price}
//                     </div>
//                     <div className="flex gap-4 justify-center items-center mt-3 w-full">
//                         <div className="flex flex-col justify-center self-stretch py-px my-auto rounded-md w-[122px]">
//                             <div className="flex flex-col justify-center items-start py-px rounded-md bg-zinc-100 max-md:pr-5">
//                                 <div className="flex z-10 shrink-0 rounded-md h-[9px] w-[69px]" />
//                             </div>
//                         </div>
//                         <div className="self-stretch my-auto text-xs text-zinc-500">
//                             {soldCount} Sold
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </article>
//     );
// };

// export default ProductCard;
