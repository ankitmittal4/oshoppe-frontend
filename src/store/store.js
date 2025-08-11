// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { productReducer, productDetailReducer } from '../features/productSlice';
import authReducer from '../features/authSlice';
import adminAuthReducer from '../features/Admin/adminAuthSlice';
import adminproductsReducer from '../features/Admin/adminProductlistSlice';
import addProductReducer from '../features/Admin/addProductSlice';
import {
    addItemReducer,
    cartItemsReducer,
    updateItemsReducer,
} from '../features/CartCred/cartSlice';
import {
    addItemWIshListReducer,
    deleteItemWishListReducer,
    wishListItemsReducer,
} from '../features/CartCred/wishList';
import {
    dealerAddReducer,
    dealerDeleteReducer,
    dealerLinkReducer,
} from '../features/Admin/Dealer/dealerAddSlice';
import { locationListReducer } from '../features/Admin/Dealer/DealerServiceLocations';
import customerReducer from '../features/Admin/Customer/customerSlice';
import orderReducer from '../features/Admin/Order/orderSlice';
import addressReducer from '../features/addressSlice';
import advisorReducer from '../features/advisorSlice';
import {
    subOrderListReducer,
    subOrderDetailReducer,
    activityListReducer,
} from '../features/OrderSlice';
import { resetProductDetails } from '../features/productSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailReducer,
        auth: authReducer,
        adminAuth: adminAuthReducer,
        adminproducts: adminproductsReducer,
        addproducts: addProductReducer,
        addcartItem: addItemReducer,
        cartItemlist: cartItemsReducer,
        updateCartItem: updateItemsReducer,
        dealerAdd: dealerAddReducer,
        dealerLink: dealerLinkReducer,
        // dealerDelete:dealerDeleteReducer,
        locationlist: locationListReducer,
        customer: customerReducer,
        order: orderReducer,
        address: addressReducer,
        advisor: advisorReducer,
        addItemWishList: addItemWIshListReducer,
        deleteItemWishList: deleteItemWishListReducer,
        getWishListItemList: wishListItemsReducer,
        suborderDetail: subOrderDetailReducer,
        suborderList: subOrderListReducer,
        activityList: activityListReducer,
        // resetProductDetails: resetProductDetails,
    },
});

export default store;
