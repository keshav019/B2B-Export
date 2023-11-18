import { createSlice } from '@reduxjs/toolkit'
import { getProducts } from '../actions/productAction';

const initialState = {
    loading: false,
    products: [],
    product: null,
    message: "",
    error: "",
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    message: "",
                    error: ""
                };
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    products: action.payload,
                    message: "User Added",
                    error: ""
                };
            })
            .addCase(getProducts.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    message: "",
                    error: action.error.message
                };
            })
    }
})


export default productSlice.reducer;