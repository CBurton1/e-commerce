import { createSelector } from "@ngrx/store";

import { State } from "./product.reducer";

export const productState = (state: any): State => {
  return state.product;
};