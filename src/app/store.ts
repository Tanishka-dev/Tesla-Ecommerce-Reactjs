import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { carsData } from "../carsData";
import carReducer from "../features/Car/carSlice";
import userReducer from "../features/User/userSlice";
export const store = configureStore({
   reducer: {
      car: carReducer,
      user: userReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            // Ignore these action types
            ignoredActions: ["your/action/type"],
            // Ignore these field paths in all actions
            ignoredActionPaths: ["payload.ref"],
            // Ignore these paths in the state
            ignoredPaths: [
               ...carsData.map((_, index) => {
                  return `car.cars.${index}.ref`;
               }),
            ],
         },
      }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
