import {
    createSlice,
    createAsyncThunk,
    asyncThunkCreator,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constants';

export const addProduct = createAsyncThunk(
    'admin/addproducts',
    async (productdata, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
                'Content-Type': 'multipart/form-data',
            };

            let reqOptions = {
                url: `${API_URL}/admin/product/add`,
                method: 'POST',
                headers: headers,
                data: productdata,
            };

            const response = await axios.request(reqOptions);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const deleteProduct = createAsyncThunk(
    'admin/deleteproducts',
    async (id, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
                // "Content-Type": "multipart/form-data",
            };

            let reqOptions = {
                url: `${API_URL}/admin/product/delete`,
                method: 'POST',
                headers: headers,
                data: id,
            };

            const response = await axios.request(reqOptions);
            //console.log('product is deleted ', response.status);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const addProductSlice = createSlice({
    name: 'addproducts',
    initialState: {
        productitems: [],
        isLoading: false,
        error: null,
        addProductSuccess: false,
        addProductStatus: 'idle',
        addProductMessage: '',
        deleteProductStatus: 'idle',
        deleteProductMessage: '',
        deleteProductSuccess: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.addProductStatus = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.addProductStatus = 'succeeded';
                state.productitems = action.payload.data;
                state.addProductMessage = action.payload.message;
                state.addProductSuccess = action.payload.success;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.addProductStatus = 'failed';
                state.error = action.payload;
                state.addProductSuccess = action.payload.success;
            })

            .addCase(deleteProduct.pending, (state) => {
                state.addProductStatus = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.addProductStatus = 'succeeded';
                state.productitems = action.payload.data;
                state.addProductMessage = action.payload.message;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.addProductStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export default addProductSlice.reducer;
