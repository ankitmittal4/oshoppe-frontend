/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
    extend: {
        fontFamily: {
            custom: ['"Poppins"', 'sans-serif'],
        },
        // screens: {
        //   'tablet': '640px',
        //   // => @media (min-width: 640px) { ... }
        //   'laptop': '1600px',
        //   // => @media (min-width: 1024px) { ... }
        //   'desktop': '1280px',
        //   // => @media (min-width: 1280px) { ... }
        // },
    },
};
export const plugins = [];
