import { createSlice } from '@reduxjs/toolkit'
import { addUser, deleteUser, getUser, getUsers, updateRole } from '../actions/adminAction';
const initialState = {
    loading: false,
    users: [],
    user: null,
    message: "",
    error: "",
}

export const adminSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(addUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    users: [...state.users, action.payload],
                    message: "User Added",
                    error: ""
                };
            })
            .addCase(addUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(getUsers.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    users: action.payload,
                    message: "",
                    error: ""
                };
            })
            .addCase(getUsers.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    users: [],
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(getUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(getUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    user: action.payload,
                    message: "",
                    error: ""
                };
            })
            .addCase(getUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    user: null,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(updateRole.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    user: { ...state.user, role: action.payload.role },
                    users: state.users.map(x => x._id === action.id ? { ...x, role: action.payload.role } : x),
                    message: "",
                    error: ""
                };
            })
            .addCase(updateRole.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(deleteUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    users: state.users.filter(x => x._id !== action.payload.id),
                    message: "User Deleted",
                    error: ""
                };
            })
            .addCase(deleteUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "",
                    error: action.error.message
                };
            })
    }
})


export default adminSlice.reducer;