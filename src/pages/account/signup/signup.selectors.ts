import { createSelector } from "@ngrx/store";

import { user } from "../../../store/user/user.selectors";

export interface SignupState {
  user: ECS.User | undefined;
}

export const signupState = createSelector(
  user,
  (user): SignupState | undefined => {
    return {
      user
    };
  }
);
