import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '../Constants';

// Add Advisor
export const addAdvisor = createAsyncThunk(
    'advisor/add',
    async (advisorData, thunkAPI) => {
        try {
            //console.log('advisor data:::::: ', advisorData);
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/advisor/add`,
                method: 'POST',
                headers: headers,
                data: advisorData,
            };

            let response = await axios.request(reqOptions);
            //console.log('Add advisor:::::: ', response.data.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// Detail Advisor
export const detailAdvisor = createAsyncThunk(
    'advisor/detail',
    async (_, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/advisor/detail`,
                method: 'POST',
                headers: headers,
                // data: {
                //     page: 1,
                //     limit: 10,
                // },
            };

            let response = await axios.request(reqOptions);
            //console.log('Detail of advisor: ', response.data.data);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

// Update Advisor
// export const updateAddress = createAsyncThunk(
//     'address/update',
//     async ({ id, addressData }, thunkAPI) => {
//         try {
//             const headers = {
//                 Authorization: localStorage.getItem('auth-token'),
//             };
//             const data = {
//                 ...addressData,
//                 addressId: id,
//             };
//             //console.log('Update address slice: ', data);
//             let reqOptions = {
//                 url: `${API_URL}/address/update`,
//                 method: 'POST',
//                 headers: headers,
//                 data: data,
//             };
//             let response = await axios.request(reqOptions);
//             //console.log('update address: ', response.data);
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     },
// );

// Delete Advisor
// export const deleteAddress = createAsyncThunk(
//     'address/delete',
//     async (id, thunkAPI) => {
//         try {
//             const headers = {
//                 Authorization: localStorage.getItem('auth-token'),
//             };
//             let reqOptions = {
//                 url: `${API_URL}/address/delete`,
//                 method: 'POST',
//                 headers: headers,
//                 data: {
//                     addressId: id,
//                 },
//             };

//             let response = await axios.request(reqOptions);
//             //console.log('Delete address: ', response.data);
//             return response.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     },
// );

// Slice
const advisorSlice = createSlice({
    name: 'advisor',
    initialState: {
        advisor: null,
        isLoading: false,
        error: null,
        addStatus: 'idle',
        // updateStatus: 'idle',
        detailStatus: 'idle',
        // deleteStatus: 'idle',
    },
    reducers: {
        resetState: (state) => {
            state.addStatus = 'idle';
            state.detailStatus = 'idle';
            // state.updateStatus = 'idle';
            // state.deleteStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            // Add Address
            .addCase(addAdvisor.pending, (state) => {
                state.isLoading = true;
                state.addStatus = 'loading';
            })
            .addCase(addAdvisor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addStatus = 'succeeded';
                state.advisor = action.payload.data;
            })
            .addCase(addAdvisor.rejected, (state, action) => {
                state.isLoading = false;
                state.addStatus = 'failed';
                state.error = action.payload.message;
            })

            // Update Address
            // .addCase(updateAddress.pending, (state) => {
            //     state.isLoading = true;
            //     state.updateStatus = 'loading';
            // })
            // .addCase(updateAddress.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.updateStatus = 'succeeded';
            //     const index = state.addresses.findIndex(
            //         (addr) => addr.id === action.payload.data.id,
            //     );
            //     if (index !== -1) {
            //         state.addresses[index] = action.payload.data;
            //     }
            // })
            // .addCase(updateAddress.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.updateStatus = 'failed';
            //     state.error = action.payload.message;
            // })

            // detail Advisor
            .addCase(detailAdvisor.pending, (state) => {
                state.isLoading = true;
                state.listStatus = 'loading';
            })
            .addCase(detailAdvisor.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listStatus = 'succeeded';
                state.advisor = action.payload;
            })
            .addCase(detailAdvisor.rejected, (state, action) => {
                state.isLoading = false;
                state.listStatus = 'failed';
                state.error = action.payload.message;
            });

        // Delete Address
        // .addCase(deleteAddress.pending, (state) => {
        //     state.isLoading = true;
        //     state.deleteStatus = 'loading';
        // })
        // .addCase(deleteAddress.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.deleteStatus = 'succeeded';
        //     state.addresses = state.addresses.filter(
        //         (addr) => addr.id !== action.meta.arg,
        //     );
        // })
        // .addCase(deleteAddress.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.deleteStatus = 'failed';
        //     state.error = action.payload.message;
        // });
    },
});

export const { resetState } = advisorSlice.actions;

export default advisorSlice.reducer;
