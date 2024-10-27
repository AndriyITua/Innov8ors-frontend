import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";
axios.defaults.withCredentials = true;

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const dailyRate = createAsyncThunk(
  "water/dailyRate",
  async (dailyNorma, thunkAPI) => {
    try {
      const response = await axios.put("/waterRate", dailyNorma);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
