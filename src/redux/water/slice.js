import { createSlice } from "@reduxjs/toolkit";
import { addWater } from "./opertionsEditWater.js";
import { featchWater } from "./opertionsEditWater";

const waterSlice = createSlice({
    name:"water",
    initialState:{
        water:{
            totalConsumed:0,
            dailyRate: 0,
            records:[
                {
                    amount: null,
                    createdAt: null,
                    updatedAt: 0,
                }
            ]
        },
        isLoading: false,
        error: null,
    },
    extraReducers: builder =>{
        builder
        .addCase(addWater.pending,(state)=>{
            state.isLoading = true;
            state.error = false;
        })
        .addCase(addWater.fulfilled, (state, action)=>{
            console.log("Отримано відповідь:", action.payload);
            state.isLoading = false;
            state.error = null;
            state.water.records.push(action.payload);
            state.water.totalConsumed += action.payload.amount;
        })
        .addCase(addWater.rejected,(state)=>{
            state.isLoading = false;
            state.error = true;
        })
            .addCase(featchWater.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(featchWater.fulfilled, (state, action) => {
                console.log("🚀 ~ action:", action);
                state.records = action.payload.data ||[] ; // Якщо payload містить вкладене поле data
    console.log("🚀 ~ state.records:", state.records);
                // state.water.records = action.payload;
                // console.log("🚀 ~ .addCase ~  state.water:",  state.records.amount)
                state.isLoading = false;
                state.error = null;
                // state.water.records.push(action.payload);
            })
            .addCase(featchWater.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Помилка отримання даних";
            })
    }
})
export const waterReducer = waterSlice.reducer;