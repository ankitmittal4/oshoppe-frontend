import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constants';

export const adminProductslist = createAsyncThunk(
    'products/admin/productslist',
    async (pageNumber, thunkAPI) => {
        try {
            //console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/product/list`,
                method: 'POST',
                headers: headers,
                data: {
                    page: pageNumber,
                    limit: 10,
                },
            };
            let response = await axios.request(reqOptions);
            //console.log(response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const dealersList = createAsyncThunk(
    'products/admin/dealerslist',
    async (pageNumber, thunkAPI) => {
        try {
            //console.log('*****');
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/dealer/list`,
                method: 'POST',
                headers: headers,
                data: {
                    page: pageNumber,
                    limit: 10,
                },
            };

            let response = await axios.request(reqOptions);
            //console.log(response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const adminProductsSlice = createSlice({
    name: 'adminproducts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        dealersItems: [],
        dealersStatus: 'idle',
        dealersSuccess: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminProductslist.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(adminProductslist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(adminProductslist.rejected, (state, action) => {
                state.addProductStatus = 'failed';
                state.error = action.payload;
            })
            .addCase(dealersList.pending, (state) => {
                state.dealersStatus = 'loading';
            })
            .addCase(dealersList.fulfilled, (state, action) => {
                state.dealersStatus = 'succeeded';
                state.dealersItems = action.payload;
            })
            .addCase(dealersList.rejected, (state, action) => {
                state.dealersStatus = 'failed';
            });
    },
});

export default adminProductsSlice.reducer;
