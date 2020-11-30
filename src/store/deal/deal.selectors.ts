import { createSelector } from "@ngrx/store";

import { DealState } from "./deal.reducer";

export const dealState = (state: any): DealState => {
  return state.deal;
};

export const deals = createSelector(
  dealState,
  (state): ECS.Deal[] | undefined => {
    if (!state.entities) {
      return;
    }

    return Object.values(state.entities) as ECS.Deal[];
  }
);

export const dealIds = createSelector(
  dealState,
  (state): string[] | number[] | undefined => {
    if (!state.ids) {
      return;
    }

    return state.ids;
  }
);
