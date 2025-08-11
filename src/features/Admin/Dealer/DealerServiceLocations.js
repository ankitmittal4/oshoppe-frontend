import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../Constants';
export const locationList = createAsyncThunk(
    'location/list',
    async (dealerId, thunkAPI) => {
        try {
            let headersList = {
                Authorization: localStorage.getItem('admin-token'),
            };
            let reqOptions = {
                url: `${API_URL}/serviceLocation/list`,
                method: 'POST',
                headers: headersList,
                data: {
                    limit: 10,
                    page: 1,
                    dealerId: dealerId,
                },
            };

            let response = await axios.request(reqOptions);

            const data = response;

            //console.log('location list fetched successfully', data);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }

        // try {

        //     // const response = await axios.get(
        //         // `https://api.example.com/locations?page=${page}`,
        //         // {
        //         //     headers: {
        //         //         Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        //         //     },
        //         // }
        //     // );
        //     return response.data;
        // } catch (error) {
        //     thunkAPI.rejectWithValue(error.response.data);
        // }
    },
);

const locationListSlice = createSlice({
    name: 'locationlist',
    initialState: {
        isLocationLoading: false,
        locations: [],
        locationsStatus: 'idle',
    },
    reducers: {
        stateChange: (state) => {
            state.locationsStatus = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(locationList.pending, (state, action) => {
                state.isLocationLoading = true;
                state.locationsStatus = 'loading';
            })
            .addCase(locationList.fulfilled, (state, action) => {
                state.isLocationLoading = false;
                state.locations = action.payload;
                state.locationsStatus = 'succeeded';
            })
            .addCase(locationList.rejected, (state, action) => {
                state.isLocationLoading = false;
                state.locationsStatus = 'failed';
            });
    },
});
export const { stateChange } = locationListSlice.actions;
export const locationListReducer = locationListSlice.reducer;
