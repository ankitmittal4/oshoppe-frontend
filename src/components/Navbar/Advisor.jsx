import React from 'react';
import Banner3 from '../../Assets/Banner3.png';
import useTitle from '../../useTitle';
const Advisor = () => {
    useTitle('Be an Advisor');
    return (
        <>
            <section className="flex flex-col justify-center pl-0 sm:max-md:pl-5 mt-10">
                <main className="flex flex-wrap gap-10 items-center mb-10 my-5">
                    <section className="flex flex-col grow shrink self-stretch px-6 py-7  bg-white rounded-xl sm:min-h-[600px] min-w-[240px] shadow-[0px_0px_8px_rgba(0,0,0,0.25)] w-[465px] max-md:px-5 max-md:max-w-full">
                        <header className="flex flex-col justify-center w-full max-md:max-w-full">
                            <h2 className="text-xl sm:text-2xl text-neutral-800">
                                Invite a friend
                            </h2>
                            <p className="text-sm sm:text-base leading-none text-teal-950">
                                Refer platform to friends do you know how it
                                work?
                            </p>
                        </header>
                        <div className="flex flex-col pr-7 pl-8 mt-5 w-full text-teal-950 max-md:px-5 max-md:max-w-full">
                            <div className="flex gap-4 items-start py-5 sm:pl-5 pl-0  max-w-full w-[474px]">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a99e35e22a9c9196a8bcb8a1e91d512715c9a989f436d18d87bfe144eb26265?placeholderIfAbsent=true&apiKey=797b3a2e195b4b33aa2d0eae756d0150"
                                    alt=""
                                    className="object-contain shrink-0 rounded-none aspect-[0.21] sm:w-[84px] w-[50px]"
                                />
                                <div className="flex flex-col py-3 min-w-[240px] w-[374px]">
                                    {/* {inviteSteps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col justify-center mt-24 max-w-full h-16 w-[374px] max-md:mt-10"
                                        >
                                            <h3 className="text-xl leading-none">
                                                {step.title}
                                            </h3>
                                            <p className="mt-1 text-base leading-5">
                                                {step.description}
                                            </p>
                                        </div>
                                    ))} */}

                                    <div className="flex flex-col justify-center  max-w-full h-16 sm:w-[374px] w-[182px] sm:max-md:mt-10 mt-0">
                                        <h3 className="sm:text-xl text-sm leading-none">
                                            Invite your friend!
                                        </h3>
                                        <p className="mt-1 sm:text-base text-xs leading-5">
                                            Copy and paste or email multiple
                                            friends with the referral link.
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center sm:mt-24 max-w-full h-16 sm:w-[374px] w-[182px] sm:max-md:mt-10 mt-8">
                                        <h3 className="sm:text-xl text-sm leading-none">
                                            Your Friends Sign up!
                                        </h3>
                                        <p className="mt-1 sm:text-base text-xs leading-5">
                                            Once they click on the link and
                                            create a account or complete profile
                                            setup.
                                        </p>
                                    </div>
                                    <div className="flex flex-col justify-center sm:mt-24 max-w-full h-16 sm:w-[374px] w-[182px] sm:max-md:mt-10 mt-6">
                                        <h3 className="sm:text-xl text-sm leading-none">
                                            You get the reward
                                        </h3>
                                        <p className="mt-1 sm:text-base text-xs leading-5">
                                            At the end of each task will be
                                            completed after you get the reward
                                            in your account wallet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="mt-5 text-base leading-none text-rose-800">
                            Terms & Conditions Apply
                        </footer>
                    </section>
                    {/* <AdvisorComponent /> */}
                    <section className="flex flex-col grow shrink self-stretch px-6 py-8 my-auto bg-white rounded-xl min-h-[700px] min-w-[240px] shadow-[0px_0px_8px_rgba(0,0,0,0.25)] w-[614px] max-md:px-5 max-md:max-w-full">
                        <header className="flex flex-col justify-center w-full max-md:max-w-full">
                            <h2 className="text-2xl text-neutral-800">
                                Become an Oshoppe Advisor
                            </h2>
                            <p className="text-base leading-none text-teal-950 max-md:max-w-full">
                                Do you become a Oshoppe Advisor and get regular
                                income!
                            </p>
                        </header>
                        <div className="flex flex-col mt-5 w-full rounded-xl max-md:max-w-full">
                            <form className="flex flex-col w-full max-md:max-w-full">
                                <div className="flex flex-wrap gap-5 items-start max-w-full w-[680px]">
                                    <InputWithLabel
                                        label="Full Name"
                                        name="fullName"
                                        required
                                    />
                                    <InputWithLabel
                                        label="Email"
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </div>
                                <div className="flex flex-wrap gap-5 items-start mt-5 max-w-full w-[680px]">
                                    <InputWithLabel
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        type="tel"
                                        required
                                    />
                                    <InputWithLabel
                                        label="Pincode"
                                        name="pincode"
                                        required
                                    />
                                </div>
                                <div className="flex gap-5 items-start mt-5 max-w-full w-[680px]">
                                    <div className="flex flex-col flex-1 shrink w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <label
                                            htmlFor="note"
                                            className="text-sm leading-none text-slate-700"
                                        >
                                            Note (optional)
                                        </label>
                                        <textarea
                                            id="note"
                                            name="note"
                                            className="flex overflow-hidden gap-2 items-center px-3.5 py-3 mt-1.5 w-full text-base leading-6 text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm min-h-[160px] max-md:max-w-full"
                                            placeholder="Describe your self"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col mt-6 w-full text-base text-white whitespace-nowrap max-md:max-w-full max-w-full ">
                                    <button
                                        type="submit"
                                        className="overflow-hidden gap-2 self-stretch px-5 py-2.5  bg-rose-800 rounded-lg border border-rose-800 border-solid shadow-sm max-md:max-w-full max-w-full w-[680px]"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>
                        <footer className="mt-5 text-base leading-none text-rose-800">
                            Terms & Conditions Apply
                        </footer>
                    </section>
                </main>
            </section>
        </>
    );
};

function InputWithLabel({ label, name, type = 'text', required = false }) {
    return (
        <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
            <label
                htmlFor={name}
                className="text-sm leading-none text-slate-700"
            >
                {label}
                {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                required={required}
                className="flex overflow-hidden gap-2 items-center px-3.5 py-2.5 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
                placeholder={label}
            />
        </div>
    );
}
export default Advisor;
