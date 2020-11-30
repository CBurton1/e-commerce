import { createSelector } from "@ngrx/store";

import { user } from "../../../core/store/user/user.selectors";

export interface SignupState {
  user: ECS.User;
}

export const signupState = createSelector(
  user,
  (user): SignupState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
