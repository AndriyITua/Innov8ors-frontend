import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteWaterRecord = createAsyncThunk(
  "water/deleteWaterRecord",
  async (id, thunkApi) => {
    try {
      await axios.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
