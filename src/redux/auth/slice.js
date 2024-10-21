import { createSlice } from "@reduxjs/toolkit";

// Стан даних про користувача
const authSlise = createSlice({
  name: "auth",
  initialState: {
    user: {
      fullNume: null,
      email: null,
      gender: null,
      dailyWaterNorm: null,
    },
    isLoggedIn: true,
    isRefreshing: false,
    isLoading: false,
    isError: false,
  },
});

export const authReduser = authSlise.reducer;
