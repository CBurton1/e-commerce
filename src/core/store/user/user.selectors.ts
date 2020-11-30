import { createSelector } from "@ngrx/store";

import { State } from "./user.reducer";

export const userState = (state: any): State => {
  return state.user;
};

export const user = createSelector(
  userState,
  (state): ECS.User | undefined => {
    if (state.user) {
      return;
    }

    return state.user;
  }
);
