import { createSelector } from "@ngrx/store";

import { State } from "./deal.reducer";

export const dealState = (state: any): State => {
  return state.deal;
};