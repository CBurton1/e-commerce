import { createSelector } from "@ngrx/store";

import { ProductStructureState } from "./product-structure.reducer";

export const productStructureState = (state: any): ProductStructureState => {
  return state.productStructure;
};

export const categories = createSelector(
  productStructureState,
  (state): ECS.ProductStructure[] | undefined => {
    if (Object.keys(state.entities).length === 0 && state.entities.constructor === Object) {
      return;
    }

    return Object.values(state.entities) as ECS.ProductStructure[];
  }
);

export const productStructureIds = createSelector(
  productStructureState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
