import { createSlice } from "@reduxjs/toolkit";
import { addWater } from "./opertionsEditWater.js";
import { featchWater } from "./opertionsEditWater";
import { deleteWaterRecord } from "./operationsDelete.js";
import { patchWater } from "./opertionsEditWater.js";
// import { dailyRate } from "./operationsDaily";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    water: {
      totalConsumed: 0,
      dailyRate: 1500,
      records: [
        {
          amount: null,
          createdAt: null,
          updatedAt: 0,
        },
      ],
    },
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(addWater.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.water.records.push(action.payload.data);
        state.water.totalConsumed += action.payload.data.amount;
      })
      .addCase(addWater.rejected, state => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(featchWater.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(featchWater.fulfilled, (state, action) => {
        state.water.records = action.payload.data.records || [];
        state.water.totalConsumed = action.payload.data.totalConsumed;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(featchWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Помилка отримання даних";
      })
      .addCase(deleteWaterRecord.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.water.records = state.water.records.filter(
          record => record._id !== action.payload
        );
      })
      .addCase(deleteWaterRecord.rejected, state => {
        state.isLoading = false;
        state.error = true;
      })

      .addCase(patchWater.pending, state => {
        state.isLoading = true;
      })
      .addCase(patchWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const updatedRecordIndex = state.water.records.findIndex(
          record => record._id === action.payload._id
        );
        if (updatedRecordIndex !== -1) {
          // Оновлення запису у стані
          state.water.records[updatedRecordIndex] = action.payload;
        }
      })
      .addCase(patchWater.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });

    // DailyWater =>
    // .addCase(dailyRate.pending, state => {
    //   // state.isModalOpen = true;
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(dailyRate.fulfilled, (state, action) => {
    //   // state.isModalOpen = true;
    //   state.user.dailyNorma = action.payload.data.dailyNorma;
    //   state.isLoading = false;
    // })
    // .addCase(dailyRate.rejected, (state, action) => {
    //   // state.isModalOpen = true;
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});
export const waterReducer = waterSlice.reducer;
