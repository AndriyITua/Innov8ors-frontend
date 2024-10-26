import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../helpers/setAuthHeader.js";

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (user, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();

      const token = reduxState.auth.accessToken;
      const id = reduxState.auth.user.id;
      setAuthHeader(token);
      const response = await axios.get(`user/${id}`, user);

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response ? error.response.data : error
      );
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);

export const getUserData = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPi) => {
    const state = thunkAPi.getState();
    const userId = state.auth.userId;
    try {
      const res = await axios.get(`/user/${userId}`);

      return res.data;
    } catch (error) {
      return thunkAPi.rejectWithValue(error.message);
    }
  }
);
