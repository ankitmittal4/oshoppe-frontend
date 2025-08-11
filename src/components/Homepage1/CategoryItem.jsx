import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGE_URL, API_URL } from '../../Constants';
import Navbar from '../Navbar/Navbar';

function CategoryItem({ key, id, name, image }) {
    //console.log('key', id, name);
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('auth-token'),
    );
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('auth-token'));
    }, [navigate]);
    const handleCategoryClick = async () => {
        // if (!isAuthenticated && !guestAddress.pincode) {
        //     setIsPopupOpen(true);
        // }
        if (!isAuthenticated && !sessionStorage.getItem('pincode')) {
            window.location.reload();
            return;
        }
        try {
            let headers = {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            };
            //console.log('key', id);
            const url = isAuthenticated
                ? `${API_URL}/customer/product/list`
                : `${API_URL}/guest/productList`;

            let reqOptions = {
                url: url,
                method: 'POST',
                headers: headers,
                data: {
                    category: [id],
                },
            };
            let response = await axios.request(reqOptions);
            //console.log('Search details: ', response.data.data);
            const products = response.data.data.products;
            // setFilteredProducts(products);
            // navigate('/products');
            // navigate('/products', { state: { products } });
            navigate(`/products?query=${encodeURIComponent(name)}`, {
                state: { products },
            });
        } catch (error) {
            console.error('Search field error:', error);
        }
    };
    return (
        <div
            className="flex flex-col shrink justify-center items-center self-stretch my-auto w-30 cursor-pointer"
            onClick={handleCategoryClick}
        >
            <img
                loading="lazy"
                src={`${IMAGE_URL}${image}`}
                alt={name}
                className="object-contain max-w-full aspect-square rounded-[68px] w-[60px]"
            />
            <div className="mt-4 ">{name}</div>
        </div>
    );
}

export default CategoryItem;
