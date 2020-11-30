import { createAction, props } from "@ngrx/store";

export const createCoupon = createAction(
  "[Create Coupon Component] Create Coupon",
  props<{coupon: ECS.Coupon}>()
);

export const createdCoupon = createAction(
  "[Create Coupon Component] Created Coupon",
  props<{coupon: ECS.Coupon}>()
);

export const readCoupons = createAction(
  "[Coupons List] Read Coupons via Service",
  props<{limit?: number}>()
);

export const receivedCoupons = createAction(
  "[Coupons List] Received Coupons via Service",
  props<{coupons: ECS.Coupon[]}>()
);

export const updateCoupon = createAction(
  "[Coupons List Operations] Update Coupon",
  props<{coupon: ECS.Coupon}>()
);

export const updatedCoupon = createAction(
  "[Coupons List Operations] Updated Coupon",
  props<{coupon: ECS.Coupon}>()
);

export const deleteCoupon = createAction(
  "[Coupons List Operations] Delete Coupon",
  props<{couponId: string}>()
);

export const deletedCoupon = createAction(
  "[Coupons List Operations] Deleted Coupon",
  props<{couponId: string}>()
);

export const couponActionTypes = {
  createCoupon,
  createdCoupon,
  readCoupons,
  receivedCoupons,
  updateCoupon,
  updatedCoupon,
  deleteCoupon,
  deletedCoupon
};
