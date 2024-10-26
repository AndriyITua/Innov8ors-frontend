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
            console.log("🚀 ~ async ~ token:", token)
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
            console.log("Response data:", response.data); // Перевіряємо response
            return response.data; // Або ж response.data.records, якщо дані вкладені глибше
        } catch (error) {
            console.error("Error fetching water data:", error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

