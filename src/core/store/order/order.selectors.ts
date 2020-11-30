import { createSelector } from "@ngrx/store";

import { State } from "./order.reducer";

export const orderState = (state: any): State => {
  return state.order;
};
