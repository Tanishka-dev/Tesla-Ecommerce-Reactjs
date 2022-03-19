import { ActionTypes } from "../constants/action-types";

export const setProducts = (products: any) => {
  return {
    type: ActionTypes.SET_PROUDUCTS,
    payload: products,
  };
};

export const selectedProduct = (product: any) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product,
  };
};
