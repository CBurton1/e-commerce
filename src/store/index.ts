import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import * as fromCategory from "./category/category.reducer";
import * as fromCoupon from "./coupon/coupon.reducer";
import * as fromDeal from "./deal/deal.reducer";
import * as fromProduct from "./product/product.reducer";
import * as fromUser from "./user/user.reducer";
import * as fromRouter from "./router/router.reducer";
import * as fromOrder from "./order/order.reducer";
import * as fromCart from "./cart/cart.reducer";
import * as fromSetting from "./setting/setting.reducer";

import { CartEffectsService } from "./cart/cart-effects.service";
import { CategoryEffectsService } from "./category/category-effects.service";
import { CouponEffectsService } from "./coupon/coupon-effects.service";
import { DealEffectsService } from "./deal/deal-effects.service";
import { RouterEffectsService } from "./router/router-effects.service";
import { OrderEffectsService } from "./order/order-effects.service";
import { SettingEffectsService } from "./setting/setting-effects.service";
import { ProductEffectsService } from "./product/product-effects.service";

export interface State {
  category: any;
  coupon: any;
  deal: any;
  user: any;
  product: any;
  router: any;
  order: any;
  cart: any;
  setting: any;
}

export const reducers: ActionReducerMap<State> = {
  category: fromCategory.categoryReducer,
  coupon: fromCoupon.couponReducer,
  deal: fromDeal.dealReducer,
  product: fromProduct.productReducer,
  user: fromUser.reducer,
  router: fromRouter.reducer,
  order: fromOrder.orderReducer,
  cart: fromCart.reducer,
  setting: fromSetting.settingReducer
};

export const effects = [
  CartEffectsService,
  CategoryEffectsService,
  CouponEffectsService,
  DealEffectsService,
  OrderEffectsService,
  ProductEffectsService,
  RouterEffectsService,
  SettingEffectsService
];

export const metaReducers: MetaReducer<State>[] = [];
