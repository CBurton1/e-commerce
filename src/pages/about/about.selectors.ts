import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface AboutState {
  user: ECS.User | undefined;
}

export const aboutState = createSelector(
  user,
  (user): AboutState | undefined => {
    return {
      user
    };
  }
);
