import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface HomeState {
  user: ECS.User;
}

export const homeState = createSelector(
  user,
  (user): HomeState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
