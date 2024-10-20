import { createSlice } from "@reduxjs/toolkit";
import { login } from "./operationLogin.js";

const authSlise = createSlice({
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
    isError: false,
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.isLoggedIn = true;
        state.accessToken = payload.accessToken;
      });
  },
});

export const authReduser = authSlise.reducer;
