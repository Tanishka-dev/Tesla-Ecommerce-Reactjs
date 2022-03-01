import { configureStore } from "@reduxjs/toolkit";
import carReducer from "../features/Car/carSlice";
export const store = configureStore({
  reducer: {
    car: carReducer,
  },
});
