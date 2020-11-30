import { createSelector } from "@ngrx/store";

import { OrderState } from "./order.reducer";

export const orderState = (state: any): OrderState => {
  return state.order;
};

export const orders = createSelector(
  orderState,
  (state): ECS.Order[] | undefined => {
    if (!state.entities) {
      return;
    }

    return Object.values(state.entities) as ECS.Order[];
  }
);

export const orderIds = createSelector(
  orderState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
