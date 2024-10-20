import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { setAuthHeader } from "../helpers/setAuthHeader.js";
import { notifySuccessToast } from "../../helpers/hot-toasts.js";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

axios.defaults.withCredentials = true;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      notifySuccessToast("Successfully logged in!");
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const reduxState = thunkApi.getState();
    setAuthHeader(reduxState.auth.accessToken);

    try {
      const response = await axios.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
