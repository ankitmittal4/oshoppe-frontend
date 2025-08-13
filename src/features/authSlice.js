import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { data } from 'autoprefixer';
import axios from 'axios';
import { resolve } from 'url';
import SignUp from '../components/Userloginlogout/Signup';

import { API_URL } from '../Constants';

export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            let reqOptions = {
                url: `${API_URL}/customer/login`,
                method: 'POST',
                // headers: headersList,
                data: userData,
            };

            let response = await axios.request(reqOptions);

            const data = response.data.data;
            // console.log("data: ", data);

            //console.log(data);
            localStorage.setItem('auth-token', data.accessToken);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const signUp = createAsyncThunk(
    'auth/signup',
    async (userData, thunkAPI) => {
        // //console.log('userData: ', userData);
        try {
            let reqOptions = {
                url: `${API_URL}/customer/signup`,
                method: 'POST',
                // headers: headersList,
                data: userData,
            };

            let response = await axios.request(reqOptions);

            //console.log('response: ', response);
            //  localStorage.setItem("auth-token", data.accessToken)

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const getUserDetails = createAsyncThunk(
    'auth/userdeatails',
    async (_, thunkAPI) => {
        try {
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/customer/detail`,
                method: 'GET',
                headers: headers,
            };

            let response = await axios.request(reqOptions);

            //console.log('getUserdetails fetched ....', response);
            //  localStorage.setItem("auth-token", data.accessToken)

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);
export const updateUserDetails = createAsyncThunk(
    'auth/updateuserdeatails',
    async (userData, thunkAPI) => {
        try {
            //console.log('userData: ', userData);
            const headers = {
                Authorization: localStorage.getItem('auth-token'),
            };
            let reqOptions = {
                url: `${API_URL}/customer/update`,
                method: 'PATCH',
                headers: headers,
                data: userData,
            };

            let response = await axios.request(reqOptions);

            //console.log('user updated ....', response);
            //  localStorage.setItem("auth-token", data.accessToken)

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    // Here you can make a request to your API to invalidate the token if necessary
    localStorage.removeItem('auth-token');
    return true;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        isLoading: false,
        error: null,
        authStatus: 'idle',
        logoutStatus: 'idle',
        status: 'idle',
        signUpmsg: '',
        signUpSuccess: '',
        onHomepage: false,
        loginSuccess: false,
        loginMsg: '',
        userStatus: 'idle',
        userData: null,
        upadateUserStatus: 'idle',
        updateUserSuccess: false,
        updatedData: '',
        updateUserMsg: '',
    },
    reducers: {
        stateChange: (state) => {
            state.signUpSuccess = false;
            state.authStatus = 'idle';
            state.status = 'idle';
        },
        resetLoginState: (state) => {
            state.status = 'idle';
            state.loginSuccess = false;
            state.loginMsg = '';
        },
        resetUpdateUserState: (state) => {
            state.updateUserStatus = 'idle';
            state.updateUserSuccess = false;
            state.updatedData = '';
            state.updateUserMsg = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = true;
                state.token = action.payload.data.accessToken;
                state.loginMsg = action.payload.message;
                state.status = 'succeeded';
                // //console.log("after login successful");
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.loginMsg = 'Please enter valid credentials';
                // state.loginMsg = action.payload.message;
            })
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.authStatus = 'loading';
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = true;
                // state.token = action.payload;
                state.authStatus = 'succeeded';
                state.signUpmsg = action.payload.message;
                state.signUpSuccess = action.payload.success;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.authStatus = 'failed';
                state.signUpmsg = action.payload.message;
                state.signUpSuccess = action.payload.success;
                // state.error = action.payload;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.userStatus = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.userStatus = 'failed';
                // state.error = action.payload;
            })

            .addCase(updateUserDetails.pending, (state) => {
                state.updateUserStatus = 'loading';
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.updateUserStatus = 'succeeded';
                state.updateUserSuccess = action.payload.success;
                state.updatedData = action.payload.data;
                state.updateUserMsg = action.payload.message;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.updateUserStatus = 'failed';
                state.updateUserMsg = action.payload.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutStatus = 'succeeded';
                state.user = false;
                state.token = null;
            });
    },
});

export const { stateChange, resetLoginState, resetUpdateUserState } =
    authSlice.actions;

export default authSlice.reducer;
