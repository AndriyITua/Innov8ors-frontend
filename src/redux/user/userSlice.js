import { createSlice } from "@reduxjs/toolkit";
import { fetchUserById } from "./userOperations";

const initialState = {
  id: null,
  username: null,
  email: null,
  userphoto: null, // Поле для фото користувача
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.id = payload._id;
        state.username = payload.data.username;
        state.email = payload.data.email;
        state.userphoto = payload.data.userphoto || null; // Зберігаємо фото, якщо воно є
      })
      .addCase(fetchUserById.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const userReducer = userSlice.reducer;
