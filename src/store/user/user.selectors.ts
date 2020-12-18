import { createSelector } from "@ngrx/store";

import { State } from "./user.reducer";

export const userState = (state: any): State => {
  return state.user;
};

export const user = createSelector(
  userState,
  (state): ECS.User | undefined => {
    return state.currentUser;
  }
);

export const users = createSelector(
  userState,
  (state): ECS.User[] | undefined => {
    if (!state.users) {
      return;
    }

    return state.users;
  }
);
