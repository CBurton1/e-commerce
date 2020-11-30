import { createSelector } from "@ngrx/store";

import { State } from "./coupon.reducer";

export const couponState = (state: any): State => {
  return state.coupon;
};
