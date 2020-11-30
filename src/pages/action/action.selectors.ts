import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface ActionState {
  user: ECS.User;
}

export const actionState = createSelector(
  user,
  (user): ActionState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
