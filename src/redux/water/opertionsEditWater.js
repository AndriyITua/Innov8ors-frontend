import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL="https://innov8ors-backend.onrender.com"
axios.defaults.withCredentials = true

export const setAuthHeader = (token)=> {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    };

export const addWater = createAsyncThunk(
    "water/addWater",
    async (water, thunkApi) =>{
        try {
            const reduxState = thunkApi.getState();
            const token = reduxState.auth.accessToken;
            setAuthHeader(token); 
            const response = await axios.post("/water", water);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, thunkAPI)=>{
            const reduxState = thunkAPI.getState();
            const token = reduxState.auth.accessToken;
            setAuthHeader(token);
        }
    }
); 
export const featchWater = createAsyncThunk(
    'water/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/water/today")
            return response.data; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
export const patchWater = createAsyncThunk(
    "water/patchWater",
    async ({id, data}, thunkAPI)=>{
        try {
            const response = await axios.patch(`https://innov8ors-backend.onrender.com/water/${id}`, data);
            // const response = await axios.patch(`/water/${id}`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

