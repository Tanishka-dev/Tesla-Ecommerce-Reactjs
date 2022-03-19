import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { carsData } from "../../carsData";
import ActionTypes from "../constants/action-types";

// Define a type for the slice state
interface CarState {
	cars: Car[];
}

type Car = {
	id: number;
	title: string;
	description: string;
	backgroundImg: string;
	ref: any;
	price: number;
	highlights: string[];
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
			let [...cars] = state.cars.filter((item) => item.id !== action.payload.id);
			car.ref = action.payload.ref.current;
			state.cars = [...cars, car];
		},

		productReducer: (state, action) => {
			switch (action.type) {
				case ActionTypes.SELECTED_PRODUCT:
					return { ...state, cars: action.payload };
				default:
					return state;
			}
		},
	},
});

export const { productReducer } = carSlice.actions;
export const { setCarRef } = carSlice.actions;
export const selectCars = (state: RootState) => state.car.cars;
export default carSlice.reducer;
