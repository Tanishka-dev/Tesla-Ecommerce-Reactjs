import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { RootState } from "../../app/store";
import { carsData } from "../../carsData";

// Define a type for the slice state
interface CarState {
  cars: Car[];
}

type Car = {
  id: number;
  title: string;
  description: string;
  backgroundImg: string;
  leftBtnText: string;
  rightBtnText: string;
  ref: React.MutableRefObject<any> | null;
};

const initialState: CarState = {
  cars: [...carsData],
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCarRef: (state, action) => {
      let [car] = state.cars.filter((item) => item.id === action.payload.id);
      let [...cars] = state.cars.filter(
        (item) => item.id !== action.payload.id
      );

      car.ref = action.payload.ref;
      state.cars = [...cars, car];
    },
  },
});

export const { setCarRef } = carSlice.actions;
export const selectCars = (state: RootState) => state.car.cars;
export default carSlice.reducer;
