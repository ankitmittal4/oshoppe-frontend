import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../Constants';
export const fetchSubOrderDetail = createAsyncThunk(
    'subOrder/fetchSubOrder',
    async (subOrderId, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/customer/order/detail`,
                method: 'POST',
                headers: headers,
                data: { subOrderId: subOrderId },
            };
            let response = await axios.request(reqOptions);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data || error.message,
            );
        }
    },
);
export const fetchSubOrderList = createAsyncThunk(
    'subOrder/fetchSubOrderList',
    async (pageDetails, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/customer/order/list`,
                method: 'POST',
                headers: headers,
                data: {
                    page: 1,
                    limit: 100,
                },
            };
            let response = await axios.request(reqOptions);
            return response.data.data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data || error.message,
            );
        }
    },
);
export const fetchActivityList = createAsyncThunk(
    'subOrder/fetchActivityList',
    async (subOrderId, thunkAPI) => {
        try {
            // //console.log('Activity: ', subOrderId);
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
            };
            // //console.log('!', headers);
            let reqOptions = {
                url: `${API_URL}/admin/order/activityList`,
                method: 'POST',
                headers: headers,
                data: { subOrderId: subOrderId },
            };
            let response = await axios.request(reqOptions);
            //console.log('Activity: ', response);
            return response.data.data.orders;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response.data || error.message,
            );
        }
    },
);

//INFO: Slices
const subOrderDetailSlice = createSlice({
    name: 'suborderDetail',
    initialState: {
        subOrderDetail: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubOrderDetail.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubOrderDetail.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subOrderDetail = action.payload;
            })
            .addCase(fetchSubOrderDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
const subOrderListSlice = createSlice({
    name: 'suborderList',
    initialState: {
        subOrders: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubOrderList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSubOrderList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.subOrders = action.payload;
            })
            .addCase(fetchSubOrderList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});
const activityListSlice = createSlice({
    name: 'activityList',
    initialState: {
        activityList: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivityList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchActivityList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.activityList = action.payload;
            })
            .addCase(fetchActivityList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const subOrderDetailReducer = subOrderDetailSlice.reducer;
export const subOrderListReducer = subOrderListSlice.reducer;
export const activityListReducer = activityListSlice.reducer;
