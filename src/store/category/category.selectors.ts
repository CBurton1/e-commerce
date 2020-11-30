import { createSelector } from "@ngrx/store";

import { CategoryState } from "./category.reducer";

export const categoryState = (state: any): CategoryState => {
  return state.category;
};

export const categories = createSelector(
  categoryState,
  (state): ECS.Category[] | undefined => {
    if (!state.entities) {
      return;
    }

    return Object.values(state.entities) as ECS.Category[];
  }
);

export const categoryIds = createSelector(
  categoryState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
