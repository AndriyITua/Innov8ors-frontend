import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  notifyOnlogginError,
  notifySuccessToast,
} from "../../helpers/hot-toasts.js";

axios.defaults.baseURL = "https://innov8ors-backend.onrender.com";

axios.defaults.withCredentials = true;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// оновлення фото
export const updateUserPhoto = createAsyncThunk(
  "auth/updatePhoto",
  async (userPhoto, thunkAPI) => {
    try {
      // читаем редакс state с помощью метода thunkAPI getState
      const reduxState = thunkAPI.getState();

      const token = reduxState.auth.accessToken;
      const id = reduxState.auth.user.id;
      setAuthHeader(token);

      // Создаем объект FormData и добавляем файл
      const formData = new FormData();
      formData.append("userphoto", userPhoto);

      const response = await axios.patch(`user/${id}/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notifySuccessToast("Successfully updated photo!");
      return response.data;
    } catch (error) {
      notifyOnlogginError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },

  // третий аргумент для thunkAPI - condition (условие)
  {
    condition: (_, thunkAPI) => {
      // если token !== null (т.е. true), то запрос на сервер будет выполнен
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);

// оновлення user info
export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (user, thunkAPI) => {
    try {
      // читаем редакс state с помощью метода thunkAPI getState
      const reduxState = thunkAPI.getState();

      const token = reduxState.auth.accessToken;
      const id = reduxState.auth.user.id;
      setAuthHeader(token);
      const response = await axios.patch(`user/${id}`, user);
      console.log(response.data);
      notifySuccessToast("Successfully updated user info!");
      return response.data;
    } catch (error) {
      notifyOnlogginError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },

  // третий аргумент для thunkAPI - condition (условие)
  {
    condition: (_, thunkAPI) => {
      // если token !== null (т.е. true), то запрос на сервер будет выполнен
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);

// оновлення UserPassword
export const updateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (user, thunkAPI) => {
    try {
      // читаем редакс state с помощью метода thunkAPI getState
      const reduxState = thunkAPI.getState();

      const token = reduxState.auth.accessToken;
      const id = reduxState.auth.user.id;
      setAuthHeader(token);
      const response = await axios.patch(`user/${id}/change-password`, user);
      notifySuccessToast("Successfully updated password!");
      return response.data;
    } catch (error) {
      notifyOnlogginError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },

  // третий аргумент для thunkAPI - condition (условие)
  {
    condition: (_, thunkAPI) => {
      // если token !== null (т.е. true), то запрос на сервер будет выполнен
      const reduxState = thunkAPI.getState();
      return reduxState.auth.accessToken !== null;
    },
  }
);
