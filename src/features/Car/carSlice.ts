import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../../app/store";
import { carsData } from "../../carsData";

// Define a type for the slice state
interface CarState {
   cars: Car[];
   cart: Car[];
}

type Car = {
   id: number;
   title: string;
   inStock: boolean;
   description: string;
   backgroundImg: string;
   ref: any;
   price: number;
   highlights: string[];
};

const initialState: CarState = {
   cars: [...carsData],
   cart: [],
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
         car.ref = action.payload.ref.current;
         state.cars = [...cars, car];
      },

      addToCart: (state, action) => {
         let car = state.cart.find((item) => {
            return item.id === action.payload;
         });
         if (car) return;
         let [_car] = state.cars.filter((item) => item.id === action.payload);
         state.cart = [...state.cart, _car];
      },

      removeFromCart: (state, action) => {
         let [..._car] = state.cart.filter(
            (item) => item.id !== action.payload
         );

         state.cart = [..._car];
      },
   },
});

export const { setCarRef, addToCart, removeFromCart } = carSlice.actions;
export const selectCars = (state: RootState) => state.car.cars;

export default carSlice.reducer;
