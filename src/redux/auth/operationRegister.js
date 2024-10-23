import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../helpers/setAuthHeader.js";
import { apiInstance } from "../../api/api.js";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const response = await apiInstance.post("auth/register", credentials);
      setAuthHeader(response.data.accessToken);
      toast.success("Registration successful!", {
        duration: 5000,
      });
      return response.data;
    } catch (error) {
      toast.error(
        "Registration failed: " + error.response?.data?.message ||
          error.message,
        {
          duration: 5000,
        }
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
