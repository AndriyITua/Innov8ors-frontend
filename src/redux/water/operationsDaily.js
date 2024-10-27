import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const putWaterRate = createAsyncThunk(
  "water/putWaterRate",
  async (dailynormwater, thunkApi) => {
    try {
      const response = await axios.put("/water/water-rate", { dailynormwater });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
