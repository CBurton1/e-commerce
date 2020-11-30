import { couponActionTypes } from "./coupon.actions";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

import { CouponService } from "../../services/coupon.service";

@Injectable()
export class CouponEffectsService {
  constructor(
    private couponService: CouponService,
    private actions: Actions
  ) {}

  public createCoupon = createEffect(() =>
    this.actions.pipe(
      ofType(couponActionTypes.createCoupon),
      concatMap((action) => this.couponService.createCoupon(action.coupon)),
      map((coupon) => couponActionTypes.createdCoupon({ coupon }))
    )
  );


  public readCoupons = createEffect(() =>
    this.actions.pipe(
      ofType(couponActionTypes.readCoupons),
      concatMap(() => this.couponService.readCoupons()),
      map((coupons) => couponActionTypes.receivedCoupons({ coupons }))
    )
  );

  public updateCoupon = createEffect(() =>
    this.actions.pipe(
      ofType(couponActionTypes.updateCoupon),
      concatMap((action) => this.couponService.updateCoupon(action.coupon)),
      map((coupon) => couponActionTypes.updatedCoupon({ coupon }))
    )
  );

  public deleteCoupon = createEffect(() =>
    this.actions.pipe(
      ofType(couponActionTypes.deleteCoupon),
      concatMap((action) => this.couponService.deleteCoupon(action.couponId)),
      map((couponId) => couponActionTypes.deletedCoupon({ couponId }))
    )
  );
}
