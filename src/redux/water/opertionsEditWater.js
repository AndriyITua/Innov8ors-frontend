import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addWater = createAsyncThunk(
  "water/addWater",
  async (water, thunkApi) => {
    try {
      const response = await axios.post("/water", water);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
