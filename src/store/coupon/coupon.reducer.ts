import { createReducer, on} from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter, Update } from "@ngrx/entity";

import { couponActionTypes } from "./coupon.actions";

export interface CouponState extends EntityState<ECS.Coupon> {}
export const adapter: EntityAdapter<ECS.Coupon> = createEntityAdapter<ECS.Coupon>();
export const initialState = adapter.getInitialState();

export const couponReducer = createReducer(
  initialState,
  // CRUD ACTIONS
  on(couponActionTypes.createdCoupon, (state, action) => {
    return adapter.addOne(action.coupon, state);
  }),

  on(couponActionTypes.receivedCoupons, (state, action) => {
    return adapter.addMany(action.coupons, state);
  }),

  on(couponActionTypes.updatedCoupon, (state, action) => {
    const update: Update<ECS.Coupon> = {
      id: action.coupon.id,
      changes: action.coupon
    };

    return adapter.updateOne(update, state);
  }),

  on(couponActionTypes.deletedCoupon, (state, action) => {
    return adapter.removeOne(action.couponId, state);
  })
);
