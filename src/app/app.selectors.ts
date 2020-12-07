import { createSelector } from "@ngrx/store";

import { bagOpen } from "../store/bag/bag.selectors";
import { categories } from "../store/category/category.selectors";

export interface AppState {
  bagOpen: boolean | undefined;
  categories: ECS.Category[];
}

export const appState = createSelector(
  bagOpen,
  categories,
  (bagOpen, categories): AppState | undefined => {
    if (!categories) {
      return;
    }

    return {
      bagOpen,
      categories
    };
  }
);
