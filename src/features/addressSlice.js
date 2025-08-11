import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '../Constants';

// Add Address
export const addAddress = createAsyncThunk(
    'address/add',
    async (addressData, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/address/add`,
                method: 'POST',
                headers: headers,
                data: addressData,
            };

            let response = await axios.request(reqOptions);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// Update Address
export const updateAddress = createAsyncThunk(
    'address/update',
    async ({ id, addressData }, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            const data = {
                ...addressData,
                addressId: id,
            };
            //console.log('Update address slice: ', data);
            let reqOptions = {
                url: `${API_URL}/address/update`,
                method: 'POST',
                headers: headers,
                data: data,
            };
            let response = await axios.request(reqOptions);
            //console.log('update address: ', response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// List Addresses
export const listAddresses = createAsyncThunk(
    'address/list',
    async (_, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/address/list`,
                method: 'POST',
                headers: headers,
                data: {
                    page: 1,
                    limit: 10,
                },
            };

            let response = await axios.request(reqOptions);
            // //console.log('List address: ', response.data.data.address);
            return response.data.data.address;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// Delete Address
export const deleteAddress = createAsyncThunk(
    'address/delete',
    async (id, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/address/delete`,
                method: 'POST',
                headers: headers,
                data: {
                    addressId: id,
                },
            };

            let response = await axios.request(reqOptions);
            //console.log('Delete address: ', response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// Slice
const addressSlice = createSlice({
    name: 'address',
    initialState: {
        addresses: [],
        isLoading: false,
        error: null,
        addStatus: 'idle',
        updateStatus: 'idle',
        listStatus: 'idle',
        deleteStatus: 'idle',
    },
    reducers: {
        resetState: (state) => {
            state.addStatus = 'idle';
            state.updateStatus = 'idle';
            state.listStatus = 'idle';
            state.deleteStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Add Address
            .addCase(addAddress.pending, (state) => {
                state.isLoading = true;
                state.addStatus = 'loading';
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addStatus = 'succeeded';
                state.addresses.push(action.payload.data);
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.addStatus = 'failed';
                state.error = action.payload.message;
            })

            // Update Address
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
                state.updateStatus = 'loading';
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.updateStatus = 'succeeded';
                const index = state.addresses.findIndex(
                    (addr) => addr.id === action.payload.data.id,
                );
                if (index !== -1) {
                    state.addresses[index] = action.payload.data;
                }
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.updateStatus = 'failed';
                state.error = action.payload.message;
            })

            // List Addresses
            .addCase(listAddresses.pending, (state) => {
                state.isLoading = true;
                state.listStatus = 'loading';
            })
            .addCase(listAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listStatus = 'succeeded';
                state.addresses = action.payload;
            })
            .addCase(listAddresses.rejected, (state, action) => {
                state.isLoading = false;
                state.listStatus = 'failed';
                state.error = action.payload.message;
            })

            // Delete Address
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
                state.deleteStatus = 'loading';
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deleteStatus = 'succeeded';
                state.addresses = state.addresses.filter(
                    (addr) => addr.id !== action.meta.arg,
                );
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.deleteStatus = 'failed';
                state.error = action.payload.message;
            });
    },
});

export const { resetState } = addressSlice.actions;

export default addressSlice.reducer;
