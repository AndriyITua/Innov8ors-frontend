import { createSlice } from "@reduxjs/toolkit";
import { login, refreshAccessToken, refreshUser } from "./operationLogin.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: null,
      email: null,
      dailynormwater: null,
      gender: null,
    },
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
      .addCase(refreshUser.fulfilled, state => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = null;
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
      });
  },
});

export const authReducer = authSlice.reducer;
