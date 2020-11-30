import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface ContactState {
  user: ECS.User;
}

export const contactState = createSelector(
  user,
  (user): ContactState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
