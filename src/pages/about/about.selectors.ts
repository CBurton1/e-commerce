import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface AboutState {
  user: ECS.User;
}

export const aboutState = createSelector(
  user,
  (user): AboutState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
