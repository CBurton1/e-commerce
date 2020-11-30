import { createSelector } from "@ngrx/store";

import { user } from "../../store/user/user.selectors";

export interface ContactState {
  user: ECS.User | undefined;
}

export const contactState = createSelector(
  user,
  (user): ContactState | undefined => {
    return {
      user
    };
  }
);
