import React from 'react';
import Banner3 from '../../Assets/Banner3.png';
import useTitle from '../../useTitle';
const OshoppeWorks = () => {
    useTitle('How Oshoppe works');
    return (
        <>
            <main className="flex flex-col justify-center lg:mt-10 md:mt-5 mt-3">
                <img
                    loading="lazy"
                    src={Banner3}
                    alt="Banner"
                    className="object-contain w-full rounded-lg max-md:max-w-full"
                />

                <style jsx>{`
                    builder-component {
                        max-width: none !important;
                    }
                `}</style>
            </main>
        </>
    );
};

export default OshoppeWorks;
