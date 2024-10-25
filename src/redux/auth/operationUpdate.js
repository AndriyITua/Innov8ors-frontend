import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../helpers/setAuthHeader.js";


axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

axios.defaults.withCredentials = true;

// оновлення фото
export const updateUserPhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (userPhoto, thunkAPI) => {
    try {
      // читаем редакс state с помощью метода thunkAPI getState
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token;
      setAuthHeader(token);

      console.log(`userPhoto`, userPhoto);

      // Создаем объект FormData и добавляем файл
      const formData = new FormData();
      formData.append("photo", userPhoto);

      const response = await axios.get(":id/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },

  // третий аргумент для thunkAPI - condition (условие)
  {
    condition: (_, thunkAPI) => {
      // если token !== null (т.е. true), то запрос на сервер будет выполнен
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
