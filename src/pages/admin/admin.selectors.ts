import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface AdminState {
  user: ECS.User;
}

export const adminState = createSelector(
  user,
  (user): AdminState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
