import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constants';
export const addItemWishList = createAsyncThunk(
    'products/addItemWishList',
    async (wishListData, thunkAPI) => {
        try {
            let headers = {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            };
            let reqOptions = {
                url: `${API_URL}/wishlist/modify`,
                method: 'POST',
                headers: headers,
                data: wishListData,
            };
            let response = await axios.request(reqOptions);
            //console.log('response of add widh list api: ', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
// export const updateItemQuantity = createAsyncThunk(
//     'products/updateItem',
//     async (updatedData, thunkAPI) => {
//         try {
//             let headers = {
//                 Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
//             };

//             let reqOptions = {
//                 url: '${API_URL}/cart/updateProductQuantity',
//                 method: 'POST',
//                 headers: headers,
//                 data: updatedData,
//             };

//             let response = await axios.request(reqOptions);

//             //console.log('quantity is updated', response);

//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     },
// );

export const deleteItemWishList = createAsyncThunk(
    'products/deleteItemWishList',
    async (deletedData, thunkAPI) => {
        try {
            let headers = {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            };

            let reqOptions = {
                url: `${API_URL}/wishlist/modify`,
                method: 'POST',
                headers: headers,
                data: deletedData,
            };

            let response = await axios.request(reqOptions);

            //console.log('Item is deleted from widh list: ', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const getWishListItemList = createAsyncThunk(
    'wishList/getWishListItemList',
    async (_, { rejectWithValue }) => {
        try {
            let headers = {
                Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
            };

            let reqOptions = {
                url: `${API_URL}/wishlist/list`,
                method: 'POST',
                headers: headers,
                // data: {
                //   page: 1,
                //   limit: 10,
                // },
            };

            let response = await axios.request(reqOptions);
            if (response.data.success) {
                return response.data;
            } else {
                return rejectWithValue('Failed to fetch wishlist');
            }
        } catch (error) {
            // Handle errors here
            return rejectWithValue(
                error.response ? error.response.data : 'Network error',
            );
        }
    },
);

//INFO: Slice code
const addItemWishListSlice = createSlice({
    name: 'addItemWishList',
    initialState: {
        wishListItems: [],
        isLoading: false,
        error: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addItemWishList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addItemWishList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishListItems = action.payload;
            })
            .addCase(addItemWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
const deleteItemWishListSlice = createSlice({
    name: 'deleteItemWishList',
    initialState: {
        wishListItems: [],
        isLoading: false,
        error: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteItemWishList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteItemWishList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.wishListItems = action.payload;
            })
            .addCase(deleteItemWishList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

// const updateitemSlice = createSlice({
//     name: 'updateCartItem',
//     initialState: {
//         updatedData: [],
//         isLoading: false,
//         error: null,
//         quantityStatus: 'idle',
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(updateItemQuantity.pending, (state) => {
//                 state.quantityStatus = 'loading';
//             })
//             .addCase(updateItemQuantity.fulfilled, (state, action) => {
//                 state.quantityStatus = 'succeeded';
//                 state.updatedData = action.payload;
//             })
//             .addCase(updateItemQuantity.rejected, (state, action) => {
//                 state.quantityStatus = 'failed';
//                 state.error = action.payload;
//             });
//     },
// });

const wishListItemlistSlice = createSlice({
    name: 'getWishListItemList',
    initialState: {
        wishListProducts: { products: [] }, // Ensure it's an object with a products array
        wishListLoading: false,
        error: null,
        wishListStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishListItemList.pending, (state) => {
                state.wishListStatus = 'loading';
                state.wishListLoading = true;
            })
            .addCase(getWishListItemList.fulfilled, (state, action) => {
                state.wishListStatus = 'succeeded';
                state.wishListLoading = false;
                state.wishListProducts = action.payload.data || {
                    products: [],
                }; // Extract products from data
            })
            .addCase(getWishListItemList.rejected, (state, action) => {
                state.wishListStatus = 'failed';
                state.wishListLoading = false;
                state.error = action.payload;
            });
    },
});

export const addItemWIshListReducer = addItemWishListSlice.reducer;
export const deleteItemWishListReducer = deleteItemWishListSlice.reducer;
export const wishListItemsReducer = wishListItemlistSlice.reducer;
// export const updateItemsReducer = updateitemSlice.reducer;
