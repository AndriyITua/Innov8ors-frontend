import { createSlice } from "@reduxjs/toolkit";
import { login, refreshAccessToken, refreshUser } from "./operationLogin.js";
import { logout } from "./operationLogout.js";
import { fetchUserById } from "./operationUserId.js";

import {
  updateUserPhoto,
  updateUserInfo,
  updateUserPassword,
} from "./operationUpdate.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      username: null,
      email: null,
      dailynormwater: null,
      gender: null,
      photo: null,
    },
    userId: null,
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    isError: null,
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isError = null;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.accessToken = payload.data.accessToken;
        state.userId = payload.data.userId;
        state.user.photo = payload.data.userphoto;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.accessToken = null;
        state.isError = payload;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
        state.user = payload.data;
        state.user.photo = payload.data.userphoto;
      })
      .addCase(refreshUser.rejected, (state, { payload }) => {
        state.isError = payload;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.accessToken = null;
      })
      .addCase(refreshAccessToken.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
        state.accessToken = payload;
      })
      .addCase(refreshAccessToken.rejected, (state, { payload }) => {
        state.isRefreshing = false;
        state.isError = payload;
        state.isLoggedIn = false;
        state.accessToken = null;
        state.isLoading = false;
      })

      // блок для log out
      .addCase(logout.fulfilled, state => {
        state.user = {
          id: null,
          username: null,
          email: null,
          dailynormwater: null,
          gender: null,
          photo: null,
        };
        state.userId = null;
        state.accessToken = null;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isError = null;
      })

      // блок для оновлення фото
      .addCase(updateUserPhoto.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.user.photo = payload.data.userphoto;
      })
      .addCase(updateUserPhoto.rejected, (state, { payload }) => {
        state.isError = payload;
      })

      // блок для оновлення юзера
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isError = false;
        state.user.username = payload.data.username;
        state.user.email = payload.data.email;
        state.user.gender = payload.data.gender;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.isError = payload;
      })

      // блок для оновлення пароля
      .addCase(updateUserPassword.rejected, (state, { payload }) => {
        state.isError = payload;
      })

      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user.id = payload.data._id;
        state.user.username = payload.data.username;
        state.user.email = payload.data.email;
        state.user.photo = payload.data.userphoto || null;
      })
      .addCase(fetchUserById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const authReducer = authSlice.reducer;
