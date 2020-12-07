import { ActionReducerMap, MetaReducer } from "@ngrx/store";

import * as fromCategory from "./category/category.reducer";
import * as fromCoupon from "./coupon/coupon.reducer";
import * as fromDeal from "./deal/deal.reducer";
import * as fromProduct from "./product/product.reducer";
import * as fromUser from "./user/user.reducer";
import * as fromRouter from "./router/router.reducer";
import * as fromOrder from "./order/order.reducer";
import * as fromProductStructure from "./product-structure/product-structure.reducer";
import * as fromBag from "./bag/bag.reducer";
import * as fromSetting from "./setting/setting.reducer";

import { BagEffectsService } from "./bag/bag-effects.service";
import { CategoryEffectsService } from "./category/category-effects.service";
import { CouponEffectsService } from "./coupon/coupon-effects.service";
import { DealEffectsService } from "./deal/deal-effects.service";
import { RouterEffectsService } from "./router/router-effects.service";
import { OrderEffectsService } from "./order/order-effects.service";
import { ProductStructureEffectsService } from "./product-structure/product-structure-effects.service";
import { SettingEffectsService } from "./setting/setting-effects.service";
import { ProductEffectsService } from "./product/product-effects.service";

export interface State {
  category: any;
  coupon: any;
  deal: any;
  user: any;
  product: any;
  productStructure: any;
  router: any;
  order: any;
  bag: any;
  setting: any;
}

export const reducers: ActionReducerMap<State> = {
  category: fromCategory.categoryReducer,
  coupon: fromCoupon.couponReducer,
  deal: fromDeal.dealReducer,
  product: fromProduct.productReducer,
  router: fromRouter.reducer,
  order: fromOrder.orderReducer,
  productStructure: fromProductStructure.productStructureReducer,
  setting: fromSetting.settingReducer,
  bag: fromBag.bagReducer,
  user: fromUser.reducer
};

export const effects = [
  BagEffectsService,
  CategoryEffectsService,
  CouponEffectsService,
  DealEffectsService,
  OrderEffectsService,
  ProductEffectsService,
  ProductStructureEffectsService,
  RouterEffectsService,
  SettingEffectsService
];

export const metaReducers: MetaReducer<State>[] = [];
