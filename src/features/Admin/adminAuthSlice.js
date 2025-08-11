import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../Constants';
// Async thunk for admin login
export const adminLogin = createAsyncThunk(
    'adminAuth/adminLogin',
    async (adminData, thunkAPI) => {
        try {
            // Save token to local storage

            let reqOptions = {
                url: `${API_URL}/admin/login`,
                method: 'POST',
                // headers: headersList,
                data: adminData,
            };

            let response = await axios.request(reqOptions);
            const data = response.data.data;

            //console.log('**', data);
            localStorage.setItem('admin-token', data.accessToken);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        token: null,
        isLoading: false,
        error: null,
        admin: null,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.admin = null;
            localStorage.removeItem('admin-token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.data.accessToken;
                state.admin = action.payload.data.admin;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false;
                // state.error = action.payload;
            });
    },
});

export const { logout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
