import React, { useEffect, useState } from 'react';
import { getWishListItemList } from '../../features/CartCred/wishList';
import { useDispatch, useSelector } from 'react-redux';
import WishListCard from './WishListCard';
import Loader1 from '../Loaders/Loader1';
import useTitle from '../../useTitle';
const Wishlist = () => {
    useTitle('Oshoppe WishList');
    const dispatch = useDispatch();

    const {
        wishListProducts = { products: [] },
        wishListStatus = 'idle',
        wishListLoading = false,
    } = useSelector((state) => state.getWishListItemList || {});

    const [products, setProducts] = useState([]);

    // Fetch wishlist items every time the component mounts (with the refresh key)
    useEffect(() => {
        dispatch(getWishListItemList());
    }, [dispatch]);

    useEffect(() => {
        if (wishListProducts && Array.isArray(wishListProducts.products)) {
            setProducts(wishListProducts.products);
        }
    }, [wishListProducts]);

    const refetchWishlist = () => {
        dispatch(getWishListItemList());
    };

    return (
        <>
            {wishListStatus === 'succeeded' && products.length > 0 ? (
                <div>
                    <h2 className="flex items-center justify-center text-xl border-b">
                        My Wish List
                    </h2>
                    <div className="z-50 grid grid-cols-1  lg:p-10 md:p-10 sm:p-10 sm:mt-0 mt-5">
                        {products.map((product, index) => (
                            <WishListCard
                                key={index}
                                product={product}
                                refetchWishlist={refetchWishlist} // Allows each card to trigger a refetch if needed
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-96">
                    {wishListLoading ? (
                        <Loader1 />
                    ) : (
                        <p>No products in the wishlist.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Wishlist;
