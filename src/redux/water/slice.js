import { createSlice } from "@reduxjs/toolkit";
import { addWater } from "./opertionsEditWater.js";
import { featchWater } from "./opertionsEditWater";
import { deleteWaterRecord } from "./operationsDelete.js";
import { patchWater } from "./opertionsEditWater.js";
import { fethceWaterMonth } from "./operationsMonth.js";
import { putWaterRate } from "./operationsDaily.js";
import { fetchUserById } from "../auth/operationUserId.js";

const waterSlice = createSlice({
  name: "water",
  initialState: {
    water: {
      totalConsumed: 0,
      dailyRate: 1500,
      consumptionCount: 0,
      percentage: 0,
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
      })
      .addCase(fethceWaterMonth.pending, state => {
        console.log("Fetching water month data...");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fethceWaterMonth.fulfilled, (state, action) => {
        console.log("Fetched water month data:", action.payload.data);
        state.isLoading = false;
        state.error = null;
        state.water.consumptionCount = action.payload.data.consumptionCount;
        state.water.dailyRate = action.payload.data.dailyRate;
        state.water.percentage = action.payload.data.percentage;
      })
      .addCase(fethceWaterMonth.rejected, (state, action) => {
        console.error("Error fetching water month data:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(putWaterRate.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(putWaterRate.fulfilled, (state, action) => {
        console.log(action.payload);

        state.water.dailyRate = action.payload.data.dailynormwater;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(putWaterRate.rejected, (state, payload) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(fetchUserById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.water.dailyRate = action.payload.data.dailynormwater;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const waterReducer = waterSlice.reducer;
