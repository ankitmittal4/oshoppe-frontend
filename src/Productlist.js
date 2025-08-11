// components/ProductList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/productSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        // Replace this with your actual token fetching logic
        // //console.log(token);
        dispatch(fetchProducts());
    }, [dispatch]);

    // const dispatch = useDispatch();
    // const products = useSelector((state) => state.products.products);
    // const status = useSelector((state) => state.products.status);
    // const error = useSelector((state) => state.products.error);

    // useEffect(() => {
    //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWQwZGM4ZGUxOTUzODRkMzRkOTY1YSIsImVtYWlsIjoiYW1pdGN1c3RvbWVyQGdtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyMTU3MDMxNiwiZXhwIjoxNzI0MTYyMzE2fQ.vw77FTyPFbEJh5Cie9abtBcRzhI7h5z4_KYaYdFlHK4';
    //   if (status === 'idle') {
    //     dispatch(fetchProducts(token));
    //   }
    // }, [status, dispatch]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.data.map((product) => (
                        <div
                            key={product.id}
                            className="border p-4 rounded shadow"
                        >
                            <h2 className="text-xl font-semibold">
                                {product.name}
                            </h2>
                            <p>{product.shortDescription}</p>
                            <p className="text-green-500">{product.mrp}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
