import { createSelector } from "@ngrx/store";

import { bagOpen } from "../../../store/sidebar/sidebar.selectors";

export interface BagSidebarState {
  bagOpen: boolean | undefined;
}

export const bagSidebarState = createSelector(
  bagOpen,
  (bagOpen): BagSidebarState | undefined => {
    return {
      bagOpen
    };
  }
);
