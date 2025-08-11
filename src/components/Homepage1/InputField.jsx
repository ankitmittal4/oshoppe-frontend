import React from 'react';

function InputField({ label, placeholder, type }) {
    return (
        <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[465px]">
            <label
                htmlFor={`${label.toLowerCase().replace(/\s+/g, '-')}-input`}
                className="text-neutral-800 max-md:max-w-full"
            >
                {label}
            </label>
            <input
                type={type}
                id={`${label.toLowerCase().replace(/\s+/g, '-')}-input`}
                placeholder={placeholder}
                className="flex-1 shrink self-stretch p-4 mt-4 w-full rounded-md border border-solid bg-zinc-50 border-zinc-500 text-zinc-500 max-md:max-w-full"
                aria-label={label}
            />
        </div>
    );
}

export default InputField;
