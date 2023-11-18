import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const baseurl = "http://localhost:4000/api/v1";
const baseurl = "/api/v1";


export const register = createAsyncThunk('register', async (data) => {
  try {
    const response = await axios.post(`${baseurl}/register`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});


export const login = createAsyncThunk('login', async (data) => {
  try {
    const response = await axios.post(`${baseurl}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});



export const verifyOtp = createAsyncThunk('verify/otp', async (data) => {
  try {
    const response = await axios.put(`${baseurl}/verify/otp/${data.id}`, { otp: data.otp });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});



export const getProfile = createAsyncThunk('get/profile', async (data) => {
  try {
    const response = await axios.get(`${baseurl}/profile/${data.id}`, { ...data, id: null });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
});

