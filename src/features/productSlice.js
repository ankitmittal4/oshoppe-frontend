// features/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../Constants';
// Define the API endpoints
// const AUTH_URL = "your-auth-url";
// const PRODUCTLIST_URL = "${API_URL}/customer/product/list";

// Async thunk for fetching product list
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (pageDetails, thunkAPI) => {
        try {
            let reqOptions = {
                url: `${API_URL}/guest/productList`,
                method: 'POST',
                // headers: headersList,
                data: pageDetails,
            };

            let response = await axios.request(reqOptions);
            // //console.log(response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const fetchProductDetails = createAsyncThunk(
    'products/fetchProducts',
    async (id, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            // //console.log('headers: ', headers);
            const url = localStorage.getItem('auth-token')
                ? `${API_URL}/customer/product/detail`
                : `${API_URL}/guest/productDetail`;
            const data = localStorage.getItem('auth-token')
                ? {
                      productId: id,
                  }
                : {
                      productId: id,
                      pincode: Number(sessionStorage.getItem('pincode')),
                  };
            //console.log('^^', data);
            let reqOptions = {
                url: url,
                method: 'POST',
                headers: headers,
                data: data,
            };

            let response = await axios.request(reqOptions);
            //console.log('^^^^^^^^^^details', response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

const productDetailSlice = createSlice({
    name: 'productDetails',
    initialState: {
        detail: null,
        detailStatus: 'idle',
        detailError: null,
    },
    reducers: {
        resetProductDetails: (state) => {
            // Reset state to its initial values
            state.detail = null;
            state.detailStatus = 'idle';
            state.detailError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.detailStatus = 'loading';
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.detailStatus = 'succeeded';
                state.detail = action.payload; // Store product details from action.payload
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.detailStatus = 'failed';
                state.detailError = action.payload; // Capture the error from the rejected case
            });
    },
});

export const productReducer = productSlice.reducer;
export const { resetProductDetails } = productDetailSlice.actions;

export const productDetailReducer = productDetailSlice.reducer;
