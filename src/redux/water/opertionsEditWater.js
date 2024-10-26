import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../api/api.js";

export const addWater = createAsyncThunk(
    "water/addWater",
    async(water,thunkApi) =>{
        try {
            const response = await apiInstance.post("/water", water);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
)