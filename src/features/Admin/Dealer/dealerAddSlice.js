import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../Constants';
export const dealerRegistration = createAsyncThunk(
    'admin/dealeradd',
    async (userData, thunkAPI) => {
        // Here you can make a request to your API to invalidate the token if necessary
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
                'Content-Type': 'multipart/form-data',
            };
            let reqOptions = {
                url: `${API_URL}/admin/dealer/add`,
                method: 'POST',
                headers: headersList,
                data: userData,
            };

            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('dealer added successfully', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const dealerAddSlice = createSlice({
    name: 'dealerAdd',
    initialState: {
        token: null,
        dealer: null,
        isLoading: false,
        message: '',
        dealerStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dealerRegistration.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.dealerStatus = 'loading';
            })
            .addCase(dealerRegistration.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dealer = true;
                state.dealerStatus = 'succeeded';
                state.message = action.payload.message;
                state.dealer = action.payload.data;
                //console.log('payload', action.payload.data);
                //   state.token = action.payload.data.accessToken;
            })
            .addCase(dealerRegistration.rejected, (state, action) => {
                state.isLoading = false;
                //    state.dealerStatus ="failed"
                // state.error = action.payload;
            });
    },
});

{
    /***************dealer linking with product *************************/
}

export const dealerLinking = createAsyncThunk(
    'admin/dealerlinking',
    async (linkingData, thunkAPI) => {
        // Here you can make a request to your API to invalidate the token if necessary
        try {
            //console.log('@@linking data: ', linkingData);
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/dealer/link`,
                method: 'POST',
                headers: headersList,
                data: linkingData,
            };

            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('dealer linked with product successfully', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const dealerLinkSlice = createSlice({
    name: 'dealerLink',
    initialState: {
        token: null,
        data: null,
        dealerLinkLoading: false,
        dealerLinkMsg: '',
        dealerLinkStatus: 'idle',
        dealerLinkSuccess: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dealerLinking.pending, (state) => {
                state.dealerLinkLoading = true;
                state.error = null;
                state.dealerLinkStatus = 'loading';
            })
            .addCase(dealerLinking.fulfilled, (state, action) => {
                // //console.log('action.payload: ', action.payload);
                state.dealerLinkLoading = false;
                state.dealer = true;
                state.dealerLinkStatus = 'succeeded';
                state.dealerLinkMsg = action.payload.message;
                state.dealerLinkSuccess = action.payload.success;
                // //console.log('dealerLinkSuccess: 1', state.dealerLinkSuccess);
                state.data = action.payload.data;
            })
            .addCase(dealerLinking.rejected, (state, action) => {
                state.dealerLinkLoading = false;
                state.dealerLinkStatus = 'failed';
                state.dealerLinkSuccess = action.payload.success;
                // state.error = action.payload;
            });
    },
});

{
    /*****************deleitng-dealer*******************************/
}

export const dealerDelete = createAsyncThunk(
    'admin/dealerlinking',
    async (id, thunkAPI) => {
        // Here you can make a request to your API to invalidate the token if necessary
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/admin/dealer/delete`,
                method: 'DELETE',
                headers: headersList,
                data: {
                    dealerId: id,
                },
            };

            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('dealer deleted successfully----', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const dealerdeleteSlice = createSlice({
    name: 'dealerDelete',
    initialState: {
        deleteDealerLoading: false,
        deleteDealerMsg: '',
        deleteDealerStatus: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dealerDelete.pending, (state) => {
                state.deleteDealerLoading = true;
                state.deleteDealerStatus = 'loading';
            })
            .addCase(dealerDelete.fulfilled, (state, action) => {
                state.deleteDealerLoading = false;
                state.deleteDealerStatus = 'succeeded';
                state.deleteDealerMsg = action.payload.message;

                // //console.log("payload",action.payload.data)
                //   state.token = action.payload.data.accessToken;
            })
            .addCase(dealerDelete.rejected, (state, action) => {
                state.deleteDealerLoading = false;
                state.deleteDealerStatus = 'failed';
                state.deleteDealerMsg = action.payload.message;
                // state.error = action.payload;
            });
    },
});
{
    /*****************deleitng-dealer*******************************/
}

export const dealerDeleteReducer = dealerdeleteSlice.reducer;
export const dealerAddReducer = dealerAddSlice.reducer;
export const dealerLinkReducer = dealerLinkSlice.reducer;
