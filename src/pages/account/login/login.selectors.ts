import { createSelector } from "@ngrx/store";

import { user } from "../../../core/store/user/user.selectors";

export interface LoginState {
  user: ECS.User;
}

export const loginState = createSelector(
  user,
  (user): LoginState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
