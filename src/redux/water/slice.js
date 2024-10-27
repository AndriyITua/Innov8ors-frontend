import { createSlice } from "@reduxjs/toolkit";
import { addWater } from "./opertionsEditWater";
// import { dailyRate } from "./operationsDaily";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    water: {
      totalConsumed: null,
      dailyNorma: 1500,
      records: [
        {
          amount: null,
          createdAt: null,
          updatedAt: null,
        },
      ],
    },
    isLoading: false,
    erorr: null,
  },
  extraReducers: builder => {
    builder
      .addCase(addWater.pending, state => {
        state.isLoading = true;
        state.erorr = false;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.erorr = null;
        state.water.records.push(action.payload);
        state.water.totalConsumed += action.payload.amount;
      })
      .addCase(addWater.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
export const waterReducer = waterSlice.reducer;
