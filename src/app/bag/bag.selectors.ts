import { createSelector } from "@ngrx/store";

import { bagOpen } from "../../store/bag/bag.selectors";

export interface BagState {
  bagOpen: boolean | undefined;
}

export const bagState = createSelector(
  bagOpen,
  (bagOpen): BagState | undefined => {
    return {
      bagOpen
    };
  }
);
