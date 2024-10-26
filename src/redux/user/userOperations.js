import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../helpers/setAuthHeader.js";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (user, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();

      const token = reduxState.auth.accessToken;
      const id = reduxState.auth.user.id;
      setAuthHeader(token);
      const response = await axios.get(`user/${id}`, user);

      return response.data; // Повертаємо дані про користувача з API
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
      // если token !== null (т.е. true), то запрос на сервер будет выполнен
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);
