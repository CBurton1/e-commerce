import { createSelector } from "@ngrx/store";

import { State } from "./category.reducer";

export const categoryState = (state: any): State => {
  return state.category;
};
