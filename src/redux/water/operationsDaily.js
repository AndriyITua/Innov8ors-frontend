import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const dailyRate = createAsyncThunk(
  "water/dailyRate",
  async (dailyNorma, thunkAPI) => {
    try {
      const response = await axios.patch("/user/change-water-rate", {
        dailyNorma,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
