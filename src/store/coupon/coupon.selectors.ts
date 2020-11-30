import { createSelector } from "@ngrx/store";

import { CouponState } from "./coupon.reducer";

export const couponState = (state: any): CouponState => {
  return state.coupon;
};

export const coupons = createSelector(
  couponState,
  (state): ECS.Coupon[] | undefined => {
    if (!state.entities) {
      return;
    }

    return Object.values(state.entities) as ECS.Coupon[];
  }
);

export const couponIds = createSelector(
  couponState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
