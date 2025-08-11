import MultiRangeSlider from 'multi-range-slider-react';
import React, { useEffect, useState } from 'react';
import container from '../../Assets/container2.png';
import ProductCard from './ProductCard';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import starIcon from '../../Assets/star.svg';
import Navbar from '../Navbar/Navbar';
import Products from '../Data/Products.json';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
// import Sidebar from "./Sidebar";
import Footer from '../Footer';
import Pagination from '../Pagination/Pagination';
import { useLocation } from 'react-router-dom';

// const [products, setProducts] = useState();
const productList = Products;

const Filter = () => {
    const location = useLocation();
    const products = location.state?.products || [];
    const [sortOption, setSortOption] = useState('Sort By');
    const [filters, setFilters] = useState({
        price: [0, 10000],
        brands: [],
        ratings: [],
        discounts: [],
        colors: [],
        applications: [],
        finishes: [],
        paintTypes: [],
    });

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { items, error, status } = useSelector((state) => state.products);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const path = location.pathname;

    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchProducts({ page: currentPage }));
    //     }
    // }, [dispatch, status, path]);

    // useEffect(() => {
    //     if (items && items.data) {
    //         setFilteredProducts(items.data);
    //     }
    // }, [items]);

    useEffect(() => {
        if (items && items.data) {
            // let filtered = applyFilters(items.data.products, filters);
            // //console.log("filtered", filtered);
            // let filtered = items.data;
            // let sorted = applySort(filtered, sortOption);
            // //console.log("sorted",sorted);
            setFilteredProducts(items.data.products);
        }
    }, [items, path]);

    //

    // const applyFilters = (products, filters) => {
    //     let filteredProducts = products;

    //     // //console.log("Applying filters...");

    //     // Price filter
    //     filteredProducts = filteredProducts.filter(
    //         (product) =>
    //             product.sellingPrice >= filters.price[0] &&
    //             product.sellingPrice <= filters.price[1],
    //     );
    //     // //console.log("After price filter:", filteredProducts.length);

    //     // Brand filter
    //     if (filters.brands.length > 0) {
    //         filteredProducts = filteredProducts.filter((product) =>
    //             filters.brands.includes(product.brand),
    //         );
    //     }
    //     // //console.log("After brand filter:", filteredProducts.length);

    //     // Ratings filter
    //     // if (filters.ratings.length > 0) {
    //     //   filteredProducts = filteredProducts.filter((product) =>
    //     //     filters.ratings.some((rating) => product.rating >= rating)
    //     //   );
    //     // }
    //     // //console.log("After ratings filter:", filteredProducts.length);

    //     // Discounts filter
    //     if (filters.discounts.length > 0) {
    //         filteredProducts = filteredProducts.filter((product) =>
    //             filters.discounts.some((discount) => {
    //                 const discountValue = parseInt(discount.split('%')[0]);
    //                 return product.discountPercentage >= discountValue;
    //             }),
    //         );
    //     }
    //     // //console.log("After discounts filter:", filteredProducts.length);

    //     // Colors filter
    //     if (filters.colors.length > 0) {
    //         filteredProducts = filteredProducts.filter((product) =>
    //             filters.colors.includes(product.colour),
    //         );
    //     }
    //     // //console.log("After colors filter:", filteredProducts.length);

    //     // Applications filter
    //     if (filters.applications.length > 0) {
    //         filteredProducts = filteredProducts.filter((product) =>
    //             filters.applications.includes(product.group),
    //         );
    //     }
    //     // //console.log("After applications filter:", filteredProducts.length);

    //     // Finishes filter
    //     if (filters.finishes.length > 0) {
    //         filteredProducts = filteredProducts.filter((product) =>
    //             filters.finishes.includes(product.finishType),
    //         );
    //     }
    //     // //console.log("After finishes filter:", filteredProducts.length);

    //     // Paint Types filter
    //     // if (filters.paintTypes.length > 0) {
    //     //   filteredProducts = filteredProducts.filter((product) =>
    //     //     filters.paintTypes.includes(product.paintType)
    //     //   );
    //     // }
    //     // //console.log("After paint types filter:", filteredProducts.length);

    //     return filteredProducts;
    // };

    // const applySort = (products, sortOption) => {
    //     let sortedProducts = [...products];
    //     switch (sortOption) {
    //         case 'Price: High to Low':
    //             sortedProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
    //             break;
    //         case 'Price: Low to High':
    //             sortedProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
    //             break;
    //         case 'Avg: Customer Review':
    //             sortedProducts.sort((a, b) => b.rating - a.rating);
    //             break;
    //         case 'Newest Arrivals':
    //             sortedProducts.sort((a, b) => b.id - a.id); // Assuming newer products have higher IDs
    //             break;
    //         case 'Best Sellers':
    //             sortedProducts.sort((a, b) => b.ratingCount - a.ratingCount);
    //             break;
    //         default:
    //             // No sorting for 'Featured'
    //             break;
    //     }
    //     return sortedProducts;
    // };

    // const handleSortChange = (e) => {
    //     setSortOption(e.target.value);
    // };

    // const handleFilterChange = (newFilters) => {
    //     setFilters(newFilters);
    // };

    // //console.log(filteredProducts);

    // const handleFilterChange = (filters) => {
    // let filtered = filteredProducts;

    // setFilteredProducts(filtered);
    // };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        dispatch(fetchProducts({ page: pageNumber }));

        //console.log(`Fetching data for page ${pageNumber}`);
    };

    return (
        <>
            <div className="flex flex-col pt-20 md:flex-row">
                {/* <Sidebar onFilterChange={handleFilterChange} /> */}

                <div className="flex flex-col w-full h-full">
                    <div className="flex-1 p-4 ">
                        {/* Top Section of Product List */}
                        <div className="flex flex-col items-center justify-between mb-4 md:flex-row">
                            <div className="text-base text-gray-600 font-custom">
                                {/* <p>Offers/Search</p> */}
                                {/* <p className="text-base font-medium text-black">
                  Showing 1 – {filteredProducts?.length} of{" "}
                  {items?.data?.length} results for "Offers"
                </p> */}
                            </div>
                            <div className="mt-2 md:mt-0">
                                {/* <select
                  id="sort"
                  name="sort"
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base rounded-md font-custom text-neutral-700 border-neutral-700 focus:ring-green-400 focus:outline-none focus:border-neutral-200 sm:text-sm"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option selected>Sort By</option>
                  <option>Featured</option>
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Avg: Customer Review</option>
                  <option>Newest Arrivals</option>
                  <option>Best Sellers</option>
                </select> */}
                            </div>
                        </div>
                        <div className="w-11/12 mx-auto">
                            {products.length === 0 ? (
                                <p className="text-3xl text-center text-red-700">
                                    No products found
                                </p>
                            ) : (
                                products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                    {status === 'succeeded' && (
                        <Pagination
                            totalProducts={items.data.total}
                            productsPerPage={items.data.limit}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    )}
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
};

export default Filter;
