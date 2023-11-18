import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const baseurl = "http://localhost:4000/api/v1/admin";
const baseurl = "/api/v1/admin";


export const addUser = createAsyncThunk('addUser', async (data, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${baseurl}/users`, data, config);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});


export const getUsers = createAsyncThunk('getAllUsers', async (data, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        var url = "";
        if (data.searchBy === "name") {
            if (data.role) {
                url = `${baseurl}/users?name=${data.searchTerm}&role=${data.role}`;
            } else {
                url = `${baseurl}/users?name=${data.searchTerm}`;
            }
        } else {
            url = `${baseurl}/users?mobileNumber=${data.searchTerm}`;
        }
        const response = await axios.get(url, config);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

export const getUser = createAsyncThunk('getUser', async (id, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${baseurl}/user/${id}`, config);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});


export const updateRole = createAsyncThunk('updateRole', async (data, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.put(`${baseurl}/user/${data.id}`, { role: data.role }, config);
        return { id: data.id, role: data.role };

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});


export const deleteUser = createAsyncThunk('deleteUser', async (id, { getState }) => {
    try {
        const { user } = getState();
        const token = user.data.token;
        console.log(token);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.delete(`${baseurl}/user/${id}`, config);
        console.log(response);
        return { id };

    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

