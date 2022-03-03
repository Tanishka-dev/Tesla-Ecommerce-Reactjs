import { configureStore } from "@reduxjs/toolkit";
import { carsData } from "../carsData";
import carReducer from "../features/Car/carSlice";
export const store = configureStore({
	reducer: {
		car: carReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["your/action/type"],
				// Ignore these field paths in all actions
				ignoredActionPaths: ["payload.ref.current"],
				// Ignore these paths in the state
				ignoredPaths: [
					...carsData.map((_, index) => {
						return `car.cars.${index}.ref.current`;
					}),
				],
			},
		}),
});
