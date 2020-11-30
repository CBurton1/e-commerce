import { createSelector } from "@ngrx/store";

import { ProductState } from "./product.reducer";

export const productState = (state: any): ProductState => {
  return state.product;
};

export const products = createSelector(
  productState,
  (state): ECS.Product[] | undefined => {
    if (!state.entities) {
      return;
    }

    return Object.values(state.entities) as ECS.Product[];
  }
);

export const productIds = createSelector(
  productState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
