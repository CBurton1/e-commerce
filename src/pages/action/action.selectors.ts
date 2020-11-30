import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface ActionState {
  user: ECS.User | undefined;
}

export const actionState = createSelector(
  user,
  (user): ActionState | undefined => {
    return {
      user
    };
  }
);
