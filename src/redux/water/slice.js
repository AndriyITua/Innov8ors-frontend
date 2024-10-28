import { createSlice } from "@reduxjs/toolkit";
import { addWater } from "./opertionsEditWater.js";
import { featchWater } from "./opertionsEditWater";
import { deleteWaterRecord } from "./operationsDelete.js";
import { patchWater } from "./opertionsEditWater.js";
import { fethceWaterMonth } from "./operationsMonth.js";
import { logout } from "../auth/operationLogout.js";
import { updateUserPassword } from "../auth/operationUpdate.js";

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
          consumptionTime: null,
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fethceWaterMonth.fulfilled, (state, action) => {
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
      
      // блок для логаута - возвращает initial state
      .addCase(logout.fulfilled, state => {
        state.water = {
          totalConsumed: 0,
          dailyRate: 1500,
          consumptionCount: 0,
          percentage: 0,
          records: [
            {
              amount: null,
              consumptionTime: null,
              updatedAt: 0,
            },
          ],
        };
        state.isLoading = false;
        state.error = null;
      })

      // блок для изменения пароля
      // логика логаута - возвращает initial state
      .addCase(updateUserPassword.fulfilled, state => {
        state.water = {
          totalConsumed: 0,
          dailyRate: 1500,
          consumptionCount: 0,
          percentage: 0,
          records: [
            {
              amount: null,
              consumptionTime: null,
              updatedAt: 0,
            },
          ],
        };
        state.isLoading = false;
        state.error = null;
      });
  },
});
export const waterReducer = waterSlice.reducer;
