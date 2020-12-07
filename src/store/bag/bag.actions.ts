import { createAction, props } from "@ngrx/store";

export const addedOrderProduct = createAction(
  "[Added Order Product] Added Order Product",
  props<{orderProduct: ECS.Product}>()
);

export const removedOrderProduct = createAction(
  "[Removed Order Product] Removed Order Product",
  props<{orderProduct: ECS.Product}>()
);

export const toggleBag = createAction(
  "[Toggle Bag] Toggle Bag"
);

export const bagActionTypes = {
  addedOrderProduct,
  removedOrderProduct,
  toggleBag
};
