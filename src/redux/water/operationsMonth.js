import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fethceWaterMonth = createAsyncThunk(
  "water/fethceWaterMonth",
  async ({ year, month }, thunkApi) => {
    try {
      const response = await axios.get(`/water/${year}/${month}`);
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
