import { createSlice } from '@reduxjs/toolkit'
import { getProfile, login, register, verifyOtp } from '../actions/userAction';


const initialState = {
    loading: false,
    data: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    message: "",
    error: "",
    isLoggedIn: localStorage.getItem("user") ? true : false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            return {
                ...state,
                loading: false,
                data: null,
                message: "",
                error: "",
                isLoggedIn: false
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    data: null,
                    message: "",
                    error: ""
                };
            })
            .addCase(register.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    message: "",
                    error: ""
                };
            })
            .addCase(register.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: null,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(login.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    data: null,
                    message: "",
                    error: ""
                };
            })
            .addCase(login.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    message: "",
                    error: ""
                };
            })
            .addCase(login.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: null,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(verifyOtp.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                localStorage.setItem("user", JSON.stringify(action.payload));
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    message: "",
                    error: "",
                    isLoggedIn: true
                };
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(getProfile.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                localStorage.setItem(JSON.stringify("user", action.payload));
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                    message: "",
                    error: "",
                };
            })
            .addCase(getProfile.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    data: null,
                    message: "",
                    error: action.error.message,
                    isLoggedIn: false
                };
            })
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;

