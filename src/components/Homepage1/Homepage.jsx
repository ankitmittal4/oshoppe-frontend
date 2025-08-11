import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import CategoryItem from './CategoryItem';
import FeatureItem from './FeatureItem';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import Banner1 from '../../Assets/Banner1.png';
import Banner2 from '../../Assets/Banner2.png';
import Banner3 from '../../Assets/Banner3.png';
import Banner4 from '../../Assets/Banner4.png';
import waterPurifier from '../../Assets/waterPurifier.png';
import map from '../../Assets/map.png';
import axios from 'axios';
import { API_URL, IMAGE_URL } from '../../Constants';

function SellOnOshoppe() {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [oshoppeProducts, setOshoppeProducts] = useState([]);

    // const categories = [
    //     {
    //         id: 1,
    //         name: 'Water Purifier',
    //         image: waterPurifier,
    //     },
    //     // {
    //     //     id: 2,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f77478ca72bbe15a668651e3e3fc90b0009d8990f984b37c418e92e56d899f94?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 3,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b0d4bd17ef0d708e8de667e5afa2847bf2099e50ef14fb273d23480a264a5ca0?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 4,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ebcf53374447a5f11e75e3e30d4652d2e12debcc07857be9f50b7cd1aa5fcc9f?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 5,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/89f583ab8e3b4285c38bbc00ef3880f314854a39552b2c3f3f00b87e14d52770?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 6,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/466f8dca1053c7f828f68c7ac075cf3ba3ca44dfbcc5b41fb99a6943cf401f26?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 7,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/bd961ee971513642d1f916f898e4bf67a3ea976bd0acff0727c34bc04bf496f0?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 8,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c56bc4c9d2271a4881a48347d9a4b4a04fc7f1db34c25958b1bce178aa4282b2?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 9,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c45187ed97cc746f4d8589767961c598d26d7b6aefb320a8d662a35d34839dc2?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    //     // {
    //     //     id: 10,
    //     //     name: 'Water Purifier',
    //     //     image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/74ce451117c7c1f074945c6416967037bcc3854e9375393fe722fa79a2e45891?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
    //     // },
    // ];

    const products = [
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ff919101b6039a77a5db70fdb2ce10c73ab40de52c07247427f233f4d17aa4af?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/103ecb9b2cc256ced298f38f6d4cf90a7c97875f9011529484cfac8d8320966c?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c7ad44cb9872d667e7ec307e5342db37a1c0706b669b8f9c19a3bad69adb279f?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ee70058fdc132aca4bbb2342963642b0b5499daa2e4819a617eb590950e2a1a3?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c895b701b39c3f25cc54cd8e0d5861647630c599990038e62ba4ab24b4e512e6?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/2153608df665080b091435fba2de54ab30241de2261098340272f9a8997ccdae?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/863bf7297cc85e1b1f9378bf4a22413991057af41eb104ecd7627d1807571e35?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/42ab38f2641f6234dce62799b060e59314454014713568dafabace14b4af7047?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e2121262c25cbf85df225889b94ebfacc5af6c416c4f4d8f8a53666585ee1704?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4d75d46336cff051e4393dedc368bf5e5b44cd1127f702663347e7526e368921?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d5cacd7233867673a204e6721e761022d8d207dc8d4dbabfd002881765180fda?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
        {
            image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6d74c42dd3b7f1816110351657d411c45a62220db007a513fc5fcad59026d784?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8',
            category: 'Electronic',
            title: 'RO+UV Next Gen Water Purifier with minirals',
            price: '₹2540/-',
            soldCount: 120,
        },
    ];

    const fetchCategory = async () => {
        setLoading(true);
        try {
            const data = {
                limit: 100,
                page: 1,
            };
            const response = await axios.post(
                `${API_URL}/category/list`,
                data,
                { mode: 'cors' },
            );
            // //console.log("Request: ", response.data.data);

            const category = response.data.data.category;
            // //console.log('Category: ', category);
            if (category.length) {
                // //console.log("Category: ", category);
                setCategories(category);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            //console.log('error: ', error);
        }
    };

    //IDEA: Fetching category list
    const fetchBrand = async () => {
        setLoading(true);
        try {
            const data = {
                limit: 100,
                page: 1,
            };
            const response = await axios.post(`${API_URL}/brand/list`, data);
            // //console.log("Request: ", response.data.data);

            const brand = response.data.data.brands;

            if (brand.length) {
                // //console.log('Brand: ', brand);
                setBrands(brand);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            // //console.log('error: ', error);
        }
    };
    //IDEA: Fetching product list of oshoppe express
    const fetchProducctOshopeeExpress = async () => {
        setLoading(true);
        try {
            const data = {
                limit: 100,
                page: 1,
                oshoppeExpress: true,
            };
            const response = await axios.post(
                `${API_URL}/guest/productList`,
                data,
            );
            // //console.log("Request: ", response.data.data);

            const products = response.data.data.products;

            if (products.length) {
                // //console.log('Brand: ', products);
                // const expressProducts = products.filter(
                //     (product) => product?.isExpress === true,
                // );
                // setOshoppeProducts(expressProducts);
                setOshoppeProducts(products);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            //console.log('error: ', error);
        }
    };
    useEffect(() => {
        fetchBrand();
        fetchCategory();
        fetchProducctOshopeeExpress();
    }, []);
    const handleBanner1Click = () => {
        navigate('/products/673a0cb240c213c250e1f59d');
    };
    return (
        <div className="lg:mx-10 md:mx-5 sm:mx-1 mx-0">
            <main className="flex flex-col justify-center lg:mt-10 md:mt-5 mt-3 cursor-pointer">
                <img
                    loading="lazy"
                    src={Banner1}
                    alt="Banner"
                    onClick={handleBanner1Click}
                    className="object-cover w-full  rounded-lg max-md:max-w-full "
                />

                <style jsx>{`
                    builder-component {
                        max-width: none !important;
                    }
                `}</style>
            </main>
            {/* <main className="flex flex-wrap items-center justify-center gap-6 mt-8 mx-9">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/37f652362d9060cded2e76f6c75732ca25f5857b8a9bc0ce9ceac51e2c41f42d?apiKey=50465c6614934414afb216301fa69ff8&"
                    alt=""
                    className="object-contain grow shrink self-stretch my-auto rounded-lg aspect-[1.08] min-w-[240px] w-[258px]"
                />
                <section className="flex flex-col grow shrink justify-center self-stretch py-5 pr-px pl-5 my-auto bg-white rounded-lg border border-solid border-neutral-200 min-h-[297px] min-w-[240px] w-[949px] max-md:max-w-full">
                    <header className="flex flex-col pr-6 pb-4 w-full text-3xl leading-10 border-b border-solid border-b-neutral-200 max-w-[992px] text-neutral-800 max-md:pr-5 max-md:max-w-full">
                        <h1 className="self-stretch flex-1 w-full shrink max-md:max-w-full">
                            Sell on Oshoppe D2C Omni Channel Platform and Grow
                            your Brand to Newer Heights
                        </h1>
                    </header>
                    <form className="flex flex-col mt-5 max-w-full text-sm w-[960px]">
                        <div className="flex flex-wrap items-center justify-center w-full gap-6 max-md:max-w-full">
                            <InputField
                                label="Email Id"
                                placeholder="Enter Your Email"
                                type="email"
                            />
                            <InputField
                                label="Phone Number"
                                placeholder="Enter Your Number"
                                type="tel"
                            />
                        </div>
                        <div className="flex flex-wrap justify-between mt-4 max-md:max-w-full">
                            <button className="flex gap-1 justify-center items-center self-stretch px-4 py-2.5 my-auto text-white bg-rose-800 rounded-md">
                                <span className="self-stretch my-auto">
                                    Sell Now
                                </span>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e35af7b1e2055d1763f97a9dd74305d5dacecec6680764cbe8ea1899520f9a9?apiKey=50465c6614934414afb216301fa69ff8&"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                />
                            </button>
                            <button className="flex gap-2 justify-center self-stretch my-auto whitespace-nowrap text-neutral-800 w-[72px]">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/38fc80a1b5eb7fa2bdf81d1ac31dd66fdcc79d914bad1d4c39d81a649ef247fa?apiKey=50465c6614934414afb216301fa69ff8&"
                                    alt=""
                                    className="object-contain shrink-0 my-auto aspect-square w-[22px]"
                                />
                                <span className="flex-1 shrink basis-0">
                                    Help!
                                </span>
                            </button>
                        </div>
                    </form>
                </section>
            </main> */}
            <section className="flex flex-col p-4 lg:mt-10 md:mt-5 mt-3 bg-gray-100 rounded-md ">
                <header className="flex gap-2.5 items-left self-start">
                    <h2 className="self-stretch my-auto md:text-2xl lg:text-2xl text-gray-950">
                        Top Categories
                    </h2>
                    {/* <p className="self-stretch my-auto text-sm tracking-tight text-gray-400">
                        New products with updated stocks.
                    </p> */}
                </header>
                <div className="flex flex-wrap w-full mt-1 text-base leading-5 tracking-wider text-center gap-9 text-neutral-800 max-md:max-w-full">
                    {/* <div className="flex flex-wrap w-full mt-1 text-base leading-5 tracking-wider text-center gap-9 text-neutral-800 max-md:max-w-full"> */}
                    {categories.map((category) => (
                        <CategoryItem
                            key={category?._id}
                            id={category._id}
                            name={category?.name}
                            image={category?.image}
                        />
                    ))}
                </div>
            </section>
            <main className="flex flex-col justify-center lg:mt-10 md:mt-5 mt-3">
                <img
                    loading="lazy"
                    src={Banner2}
                    alt="Banner"
                    className="object-contain w-full rounded-lg max-md:max-w-full"
                />

                <style jsx>{`
                    builder-component {
                        max-width: none !important;
                    }
                `}</style>
            </main>
            {/* <main className="flex flex-col justify-center lg:mt-10 md:mt-5 mt-3">
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
            </main> */}

            {/* <main className="flex gap-5  max-md:flex-col mt-7">
                <section className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
                    <div className="z-10 flex flex-col self-stretch my-auto mr-0 max-md:mt-10 max-md:max-w-full">
                        <h1 className="lg:text-5xl md:text-3xl sm:text-2xl text-1xl lg:leading-[53px] text-zinc-900 max-md:max-w-full">
                            Oshoppe is an Omni Channel D2C Brand Market Place.
                            Providing Quality, Service and Warranty
                        </h1>
                        <ul className="flex flex-col self-start mt-4 max-md:max-w-full">
                            {features.map((feature, index) => (
                                <FeatureItem
                                    key={index}
                                    icon={feature.icon}
                                    description={feature.description}
                                />
                            ))}
                        </ul>
                        <button className="flex gap-5 justify-center items-center py-3 mt-8 max-w-full text-xl leading-tight text-white bg-rose-800 rounded-md  md:w-[200px] w-[170px] max-md:px-2 md:mb-10">
                            <span className="self-stretch my-auto">
                                Contact Us
                            </span>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d018104f254f224a424be76c6a7f0e71e7786b7b02317908cfaafa190f59778d?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                                alt=""
                                className="object-contain shrink-0 self-stretch my-auto aspect-[1.21] w-[17px]"
                            />
                        </button>
                    </div>
                </section>
                <aside className="flex flex-col w-2/5 ml-5 max-md:ml-0 max-md:w-full">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f2e084c471a9f751ef0a5ff4daa3f068d9c90a7bb2cab90ec6868a64db8842b?placeholderIfAbsent=true&apiKey=50465c6614934414afb216301fa69ff8"
                        alt="Oshoppe brand representation"
                        className="object-contain grow w-full aspect-[1.02] max-md:max-w-full"
                    />
                </aside>
            </main> */}
            <section className="flex flex-col justify-center pl-2 bg-stone-50 max-md:pl-5 mt-5">
                <header className="lg:flex md:flex flex-wrap items-center max-w-full w-[1366px]">
                    <h2 className="self-stretch flex-1 my-auto md:text-2xl mb-4 sm:text-2xl text-2xl  mt-3 font-semibold shrink basis-0 text-neutral-800 max-md:max-w-full">
                        Oshoppe Recommended Products ⚡
                    </h2>
                    {/* <div className="flex items-center self-stretch gap-4 my-auto text-base text-center mr-4">
                        <div className="self-stretch my-auto text-neutral-800">
                            Ends in
                        </div>
                        <div className="flex gap-3 items-center self-stretch my-auto font-medium text-white whitespace-nowrap w-[146px]">
                            <div className="gap-2 self-stretch px-1.5 my-auto leading-snug bg-rose-800 rounded h-[30px] min-h-[29px] w-[30px]">
                                04
                            </div>
                            <div className="self-stretch my-auto text-lg text-neutral-800">
                                :
                            </div>
                            <div className="gap-2 self-stretch pr-1.5 pl-1.5 my-auto leading-snug bg-rose-800 rounded h-[30px] min-h-[29px] w-[30px]">
                                24
                            </div>
                            <div className="self-stretch my-auto text-lg text-neutral-800">
                                :
                            </div>
                            <div className="gap-2 self-stretch px-1.5 my-auto leading-snug bg-rose-800 rounded h-[31px] min-h-[29px] w-[31px]">
                                39
                            </div>
                        </div>
                    </div> */}
                </header>
                <div className="flex flex-wrap gap-4  items-center mt-4 max-w-full  pb-6">
                    {/* {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            {...product}
                        />
                    ))} */}
                    {oshoppeProducts.map((product, index) => (
                        <ProductCard
                            key={index}
                            {...product}
                        />
                    ))}
                </div>
            </section>

            {/* <section className="flex flex-col justify-center pl-0 sm:max-md:pl-5 mt-10">
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
            </section> */}
            <section className="flex flex-col items-start py-5 mt-5">
                <h2 className="flex-1 shrink self-stretch max-w-full sm:text-2xl text-xl text-neutral-800 w-[1366px] max-md:px-5 max-md:max-w-full font-semibold">
                    Brands with Oshoppe
                </h2>
                <div className="flex flex-wrap items-center w-full mt-1 text-base leading-5 tracking-wider text-center gap-9 text-neutral-800 max-md:max-w-full bg-stone-100 rounded-md">
                    {brands.map((brand, index) => (
                        <div className="flex flex-col  shrink justify-center items-center self-stretch my-auto w-30">
                            <img
                                loading="lazy"
                                src={`${IMAGE_URL}${brand?.image}`}
                                // src={brand?.image}
                                alt={brand?.name}
                                className={`object-contain max-w-full aspect-square  w-[90px]`}
                            />
                        </div>
                    ))}
                </div>
            </section>
            <main className="flex flex-col justify-center lg:mt-10 md:mt-5 mt-3 cursor-pointer">
                <img
                    loading="lazy"
                    src={Banner4}
                    alt="Banner"
                    onClick={handleBanner1Click}
                    className="object-cover w-full rounded-lg max-md:max-w-full "
                />

                <style jsx>{`
                    builder-component {
                        max-width: none !important;
                    }
                `}</style>
            </main>
            {/* <main className="flex overflow-hidden flex-wrap gap-10 pl-20 bg-neutral-50 rounded-[50px] max-md:pl-5">
                    <section className="flex flex-col my-auto h-[720px] w-1/2 text-neutral-400 max-md:max-w-full">
                        <header className="flex flex-col w-full text-black max-md:max-w-full">
                            <h1 className="text-5xl tracking-wide max-md:max-w-full max-md:text-4xl">
                                <span className="leading-[54px]">Get in </span>
                                <span className="text-rose-800">touch</span>
                            </h1>
                            <p className="w-full text-sm tracking-normal leading-6 max-md:max-w-full">
                                Enim tempor eget pharetra facilisis sed maecenas
                                adipiscing. Eu leo molestie vel, ornare non id
                                blandit netus.
                            </p>
                        </header>
                        <form className="flex flex-col mt-6 w-full text-base tracking-wide leading-relaxed max-md:max-w-full">
                            {inputFields.map((field, index) => (
                                <div
                                    key={index}
                                    className={`flex overflow-hidden flex-col pt-3 mt-2 max-w-full h-[55px] w-[548px]`}
                                >
                                    <label
                                        htmlFor={field.label
                                            .toLowerCase()
                                            .replace(/\s+/g, '-')}
                                        className="sr-only"
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.label
                                            .toLowerCase()
                                            .replace(/\s+/g, '-')}
                                        placeholder={field.label}
                                        className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                                        aria-label={field.label}
                                    />
                                </div>
                            ))}
                            <div className="flex flex-wrap gap-6 items-start mt-2 whitespace-nowrap h-[46px] max-md:max-w-full">
                                {addressFields.map((field, index) => (
                                    <div
                                        key={index}
                                        className={`flex overflow-hidden flex-col pt-3 mt-2 max-w-full h-[55px] ${field.width}`}
                                    >
                                        <label
                                            htmlFor={field.label
                                                .toLowerCase()
                                                .replace(/\s+/g, '-')}
                                            className="sr-only"
                                        >
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            id={field.label
                                                .toLowerCase()
                                                .replace(/\s+/g, '-')}
                                            placeholder={field.label}
                                            className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                                            aria-label={field.label}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col pt-3 mt-2 w-[548px]">
                                <label
                                    htmlFor="file-upload"
                                    className="sr-only"
                                >
                                    Upload File
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
                                    aria-label="Upload File"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-6 bg-rose-800 text-white py-2 px-4 rounded-lg hover:bg-rose-900 focus:outline-none"
                            >
                                Submit
                            </button>
                        </form>
                    </section>
                    <section className="flex-grow h-[720px] w-1/2 bg-gray-200 flex items-center justify-center">
                        <img
                            loading="lazy"
                            src={map}
                            alt="Map"
                            className="rounded-[20px]"
                        />
                    </section>
                </main> */}
        </div>
    );
}

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
export default SellOnOshoppe;

// <section className="flex flex-col justify-center  bg-stone-50 max-md:pl-5 mt-1 rounded-lg pb-10">
//     <main className="flex flex-wrap overflow-hidden gap-10 pl-8 bg-neutral-50 rounded-[50px] max-md:pl-5">
//         <section className="flex flex-col my-auto h-[670px] w-1/2 text-neutral-400 max-md:max-w-full mt-5">
//             <header className="flex flex-col w-full text-black max-md:max-w-full">
//                 <h1 className="text-5xl tracking-wide max-md:max-w-full max-md:text-4xl">
//                     <span className="leading-[54px]">Get in </span>
//                     <span className="text-rose-800">touch</span>
//                 </h1>
//                 <p className="w-full text-sm tracking-normal leading-6 max-md:max-w-full">
//                     Enim tempor eget pharetra facilisis sed maecenas adipiscing.
//                     Eu leo molestie vel, ornare non id blandit netus.
//                 </p>
//             </header>
//             <form className="flex flex-col mt-6 w-full text-base tracking-wide leading-relaxed max-md:max-w-full">
//                 {inputFields.map((field, index) => (
//                     <div
//                         key={index}
//                         className="flex overflow-hidden flex-col pt-3 mt-2 max-w-full h-[55px] w-[548px]"
//                     >
//                         <label
//                             htmlFor={field.label
//                                 .toLowerCase()
//                                 .replace(/\s+/g, '-')}
//                             className="sr-only"
//                         >
//                             {field.label}
//                         </label>
//                         <input
//                             type={field.type}
//                             id={field.label.toLowerCase().replace(/\s+/g, '-')}
//                             placeholder={field.label}
//                             className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
//                             aria-label={field.label}
//                         />
//                     </div>
//                 ))}
// <div className="flex flex-wrap gap-6 items-start mt-2 whitespace-nowrap h-[46px] max-md:max-w-full">
//     {addressFields.map((field, index) => (
//         <div
//             key={index}
//             className={`flex overflow-hidden flex-col pt-3 mt-2 max-w-full h-[55px] ${field.width}`}
//         >
//             <label
//                 htmlFor={field.label
//                     .toLowerCase()
//                     .replace(/\s+/g, '-')}
//                 className="sr-only"
//             >
//                 {field.label}
//             </label>
//             <input
//                 type={field.type}
//                 id={field.label
//                     .toLowerCase()
//                     .replace(/\s+/g, '-')}
//                 placeholder={field.label}
//                 className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
//                 aria-label={field.label}
//             />
//         </div>
//     ))}
// </div>

//                 <div className="flex flex-col pt-3 mt-2 w-[548px] mt-4">
//                     {/* Hidden File Input */}
//                     <input
//                         type="file"
//                         id="file-upload"
//                         className="hidden"
//                         aria-label="Upload File"
//                         // onChange={handleFileChange}
//                     />

//                     <label
//                         htmlFor="file-upload"
//                         className="flex items-center justify-center w-full h-16  border-2 border-dashed border-zinc-500 text-center cursor-pointer "
//                     >
//                         Upload Additional File
//                     </label>
//                     <p className="text-xs">
//                         Attach file. File size of your documents should not
//                         exceed 10MB
//                     </p>
//                 </div>
//                 <button
//                     type="submit"
//                     className="mt-6 bg-rose-800 text-white py-2 px-4 rounded-lg hover:bg-rose-900 focus:outline-none w-[86%]"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </section>

//         <section className="flex-grow h-[680px] w-1/2  flex items-center justify-center mt-5">
//             <img
//                 loading="lazy"
//                 src={map}
//                 alt="Map"
//                 className="w-full h-full "
//             />
//         </section>
//     </main>
// </section>;

// get in touch section

// {/* <section className="flex flex-col justify-center bg-stone-50 sm:max-md:pl-5 mt-1 rounded-lg pb-10 mx-auto">
//     <main className="flex  overflow-hidden gap-10 pl-8 bg-neutral-50 rounded-[50px] max-md:flex-col max-md:pl-5 justify-center">
//         <section className="flex flex-col my-auto h-[670px] w-1/2 text-neutral-400 max-md:w-full mt-5 pr-3">
//             <header className="flex flex-col w-full text-black max-md:w-full">
//                 <h1 className="text-5xl tracking-wide max-md:text-4xl">
//                     <span className="leading-[54px]">Get in </span>
//                     <span className="text-rose-800">touch</span>
//                 </h1>
//                 <p className="w-full text-sm tracking-normal leading-6">
//                     Enim tempor eget pharetra facilisis sed maecenas adipiscing.
//                     Eu leo molestie vel, ornare non id blandit netus.
//                 </p>
//             </header>
//             <form className="flex flex-col mt-6 w-full text-base tracking-wide leading-relaxed">
//                 {inputFields.slice(0, 2).map((field, index) => (
//                     <div
//                         key={index}
//                         className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full"
//                     >
//                         <label
//                             htmlFor={field.label
//                                 .toLowerCase()
//                                 .replace(/\s+/g, '-')}
//                             className="sr-only"
//                         >
//                             {field.label}
//                         </label>
//                         <input
//                             type={field.type}
//                             id={field.label.toLowerCase().replace(/\s+/g, '-')}
//                             placeholder={field.label}
//                             className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
//                             aria-label={field.label}
//                         />
//                     </div>
//                 ))}
//                 <div className="flex flex-wrap gap-6 items-start  w-full">
//                     {addressFields.map((field, index) => (
//                         <div
//                             key={index}
//                             className={`flex overflow-hidden flex-col pt-7  w-[48%] max-md:w-full`}
//                         >
//                             <label
//                                 htmlFor={field.label
//                                     .toLowerCase()
//                                     .replace(/\s+/g, '-')}
//                                 className="sr-only"
//                             >
//                                 {field.label}
//                             </label>
//                             <input
//                                 type={field.type}
//                                 id={field.label
//                                     .toLowerCase()
//                                     .replace(/\s+/g, '-')}
//                                 placeholder={field.label}
//                                 className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
//                                 aria-label={field.label}
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 {inputFields.slice(2).map((field, index) => (
//                     <div
//                         key={index}
//                         className="flex overflow-hidden flex-col pt-7 mt-2 w-full max-w-full"
//                     >
//                         <label
//                             htmlFor={field.label
//                                 .toLowerCase()
//                                 .replace(/\s+/g, '-')}
//                             className="sr-only"
//                         >
//                             {field.label}
//                         </label>
//                         <input
//                             type={field.type}
//                             id={field.label.toLowerCase().replace(/\s+/g, '-')}
//                             placeholder={field.label}
//                             className="w-full bg-transparent border-b border-zinc-500 focus:outline-none focus:border-rose-800"
//                             aria-label={field.label}
//                         />
//                     </div>
//                 ))}

// <div className="flex flex-col pt-3 mt-2 w-full mt-4">
//     <input
//         type="file"
//         id="file-upload"
//         className="hidden"
//         aria-label="Upload File"
//     />
//     <label
//         htmlFor="file-upload"
//         className="flex items-center justify-center w-full h-16 border-2 border-dashed border-zinc-500 text-center cursor-pointer"
//     >
//         Upload Additional File
//     </label>
//     <p className="text-xs">
//         Attach file. File size of your documents should not
//         exceed 10MB
//     </p>
// </div>
//                 <button
//                     type="submit"
//                     className="mt-6 bg-rose-800 text-white py-2 px-4 rounded-lg hover:bg-rose-900 focus:outline-none w-full max-md:w-11/12"
//                 >
//                     Submit
//                 </button>
//             </form>
//         </section>

//         {/* Right Section - Map */}
//         <section className="flex-grow w-1/2 flex items-center justify-center sm:mt-5 max-md:w-full max-md:h-80 mt-28 mx-auto pr-2">
//             {/* <img
//                             loading="lazy"
//                             src={map}
//                             alt="Map"
//                             className="w-full h-full mx-auto"
//                         /> */}
//         </section>
//     </main>
// </section>; */}
