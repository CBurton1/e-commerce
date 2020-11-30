import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface AccountState {
  user: ECS.User;
}

export const accountState = createSelector(
  user,
  (user): AccountState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
