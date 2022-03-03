import { createSlice } from "@reduxjs/toolkit";
import { carsData } from "../../carsData";

const initialState = {
	cars: [...carsData],
};

export const carSlice = createSlice({
	name: "car",
	initialState,
	reducers: {
		setCarRef: (state, action) => {
			let [car] = state.cars.filter((item) => item.id === action.payload.id);
			let [...cars] = state.cars.filter((item) => item.id !== action.payload.id);

			car.ref = action.payload.ref;
			state = [...cars, car];
		},
	},
});

export const { setCarRef } = carSlice.actions;
export const selectCars = (state) => state.car.cars;
export default carSlice.reducer;
