import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

// функція скидання токена авторизації при логауті
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

//logout юзера
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
