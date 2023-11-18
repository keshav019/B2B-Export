import { createSlice } from '@reduxjs/toolkit'
import { addProduct, getProducts } from '../actions/vendorAction';
const initialState = {
    loading: false,
    products: [],
    product: null,
    message: "",
    error: "",
}

export const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    product: action.payload,
                    message: "Product Added",
                    error: ""
                };
            })
            .addCase(addProduct.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "",
                    error: action.error.message
                };
            })
            .addCase(getProducts.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log(action.payload)
                return {
                    ...state,
                    loading: false,
                    products: action.payload,
                    message: "",
                    error: ""
                };
            })
            .addCase(getProducts.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    users: [],
                    message: "",
                    error: action.error.message
                };
            })
    }
})


export default vendorSlice.reducer;