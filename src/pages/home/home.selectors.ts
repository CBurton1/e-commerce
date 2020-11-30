import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface HomeState {
  user: ECS.User | undefined;
}

export const homeState = createSelector(
  user,
  (user): HomeState | undefined => {
    return {
      user
    };
  }
);
