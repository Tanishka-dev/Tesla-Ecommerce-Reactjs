import { useAppSelector } from "../app/store";

export const useCartState = () => useAppSelector((state) => state.car.cart);
