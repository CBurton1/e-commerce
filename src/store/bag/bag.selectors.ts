import { createSelector } from "@ngrx/store";

import { BagState } from "./bag.reducer";

export const bagState = (state: any): BagState => {
  return state.bag;
};

export const bagOpen = createSelector(
  bagState,
  (state): boolean | undefined => {
    return state.bagOpen;
  }
);
