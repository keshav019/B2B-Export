import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const baseurl = "http://localhost:4000/api/v1/product";
const baseurl = "/api/v1/product";



export const getProducts = createAsyncThunk("product/getProducts", async (data) => {
    try {
        const response = await axios.get(`${baseurl}`);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

