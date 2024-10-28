import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWaterMonth = createAsyncThunk(
  "water/fetchWaterMonth",
  async ({ year, month }, thunkApi) => {
    try {
      const response = await axios.get(`/water/${year}/${month}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
