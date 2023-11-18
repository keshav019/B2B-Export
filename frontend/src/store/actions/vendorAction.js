import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const baseurl = "http://localhost:4000/api/v1/vendor";
const baseurl = "/api/v1/vendor";



export const addProduct = createAsyncThunk('vendor/addProducts', async (data, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(baseurl, data, config);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});


export const getProducts = createAsyncThunk('vendor/getProduct', async (data, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(baseurl, config);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});


