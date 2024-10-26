import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

axios.defaults.withCredentials = true;

export const fetchUserDetails = createAsyncThunk(
  "auth/fetchUserDetails",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/auth/user");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
