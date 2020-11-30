import { createSelector } from "@ngrx/store";

import { user } from "../../../store/user/user.selectors";

export interface LoginState {
  user: ECS.User | undefined;
}

export const loginState = createSelector(
  user,
  (user): LoginState | undefined => {
    return {
      user
    };
  }
);
