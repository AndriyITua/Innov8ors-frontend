import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { setAuthHeader } from "../helpers/setAuthHeader.js";

import {
  notifyOnlogginError,
  notifySuccessToast,
} from "../../helpers/hot-toasts.js";

import { apiInstance } from "../../api/api.js";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

axios.defaults.withCredentials = true;


export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const response = await apiInstance.post("/auth/login", credentials);
      notifySuccessToast("Successfully logged in!");
      setAuthHeader(response.data.data.accessToken);

      return response.data;
    } catch (error) {
      notifyOnlogginError(error.response.data.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const reduxState = thunkApi.getState();
    setAuthHeader(reduxState.auth.accessToken);
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, thunkApi) => {
    try {
      const response = await apiInstance.post("/auth/refresh");
      setAuthHeader(response.data.data.accessToken);
      return response.data.data.accessToken;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

