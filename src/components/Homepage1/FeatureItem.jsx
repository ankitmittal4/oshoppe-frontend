import React from 'react';

function FeatureItem({ icon, description }) {
    return (
        <li className="flex gap-2 items-start self-start mt-4 max-md:max-w-full">
            <img
                loading="lazy"
                src={icon}
                alt=""
                className="object-contain shrink-0 w-5 aspect-square"
            />
            <p className="text-sm leading-snug text-stone-500 w-[508px] max-md:max-w-full">
                {description}
            </p>
        </li>
    );
}

export default FeatureItem;
