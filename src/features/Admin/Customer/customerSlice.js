import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../Constants';
export const customerListing = createAsyncThunk(
    'admin/customer/list',
    async (pageNumber, thunkAPI) => {
        // Here you can make a request to your API to invalidate the token if necessary
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/customer/list`,
                method: 'POST',
                headers: headersList,
                data: {
                    page: pageNumber,
                    limit: 10,
                },
            };

            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('customer list fetched successfully', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const customerDelete = createAsyncThunk(
    'admin/customer/delete',
    async (customerId, thunkAPI) => {
        // Here you can make a request to your API to invalidate the token if necessary
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/customer/delete`,
                method: 'DELETE',
                headers: headersList,
                data: { customerId: customerId },
            };

            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('customer with details deleted successfully', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const customerUpdate = createAsyncThunk(
    'admin/customer/edit',
    async (customerData, thunkAPI) => {
        // Here you can make a request to your API to invalidate the token if necessary
        try {
            //console.log('customerData: ', customerData);
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
                'Content-Type': 'multipart/form-data',
            };
            let reqOptions = {
                url: `${API_URL}/admin/customer/edit`,
                method: 'PATCH',
                headers: headersList,
                data: customerData,
            };
            //console.log('+++++');
            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('customer with details updated successfully', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const customerSlice = createSlice({
    name: 'customer',

    initialState: {
        customerList: [],
        customerListStatus: 'idle',
        isLoading: false,
        cutomerDeleteStatus: 'idle',
        customerDeleteLoading: false,
        customerDeleteSuccess: false,

        customerEditStatus: 'idle',
        customerEditLoading: false,
        customerEditSuccess: false,
        customerEditMessage: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(customerListing.pending, (state) => {
                state.isLoading = true;
                state.customerListStatus = 'loading';
            })
            .addCase(customerListing.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customerListStatus = 'succeeded';
                state.customerList = action.payload;
            })
            .addCase(customerListing.rejected, (state, action) => {
                state.isLoading = false;
                state.customerListStatus = 'failed';
                // state.error = action.payload;
            })

            .addCase(customerDelete.pending, (state) => {
                state.customerDeleteLoading = true;
                state.cutomerDeleteStatus = 'loading';
            })
            .addCase(customerDelete.fulfilled, (state, action) => {
                state.customerDeleteLoading = false;
                state.customerDeleteSuccess = action.payload.success;
                state.cutomerDeleteStatus = 'succeeded';
            })
            .addCase(customerDelete.rejected, (state, action) => {
                state.cutomerDeleteStatus = 'failed';
                state.customerDeleteLoading = false;
                state.customerDeleteSuccess = action.payload.success;
            })

            .addCase(customerUpdate.pending, (state) => {
                state.customerEditLoading = true;
                state.customerEditStatus = 'loading';
            })
            .addCase(customerUpdate.fulfilled, (state, action) => {
                state.customerEditLoading = false;
                state.customerEditSuccess = action.payload.success;
                state.customerEditStatus = 'succeeded';
            })
            .addCase(customerUpdate.rejected, (state, action) => {
                state.customerEditLoading = false;
                state.customerEditSuccess = action.payload.success;
                state.customerEditStatus = 'failed';
            });
    },
});

export default customerSlice.reducer;
