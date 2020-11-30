import { createSelector } from "@ngrx/store";

import { user } from "../../core/store/user/user.selectors";

export interface ShopState {
  user: ECS.User;
}

export const shopState = createSelector(
  user,
  (user): ShopState | undefined => {
    if (!user) {
      return;
    }

    return {
      user
    };
  }
);
